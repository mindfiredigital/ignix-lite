import type { HTMLElement } from 'node-html-parser'
import type { A11yIssue, RuleResult } from './a11y-types.js'
import { getElementSelector } from '../tools/handoff.js'

function injectAttr(outerHTML: string, attr: string, value: string): string {
  return outerHTML.replace(/^(<[a-zA-Z][a-zA-Z0-9-]*)/, `$1 ${attr}="${value}"`)
}

function clip(str: string, max = 200): string {
  return str.length > max ? str.slice(0, max) + '...' : str
}

function isDecorative(img: HTMLElement): boolean {
  const role = img.getAttribute('role')
  const ariaHidden = img.getAttribute('aria-hidden')
  return role === 'presentation' || role === 'none' || ariaHidden === 'true'
}

// Returns IDs from an ARIA reference attribute that do not exist in the DOM
function findBrokenAriaRefs(
  el: HTMLElement,
  attr: string,
  root: HTMLElement
): string[] {
  const val = el.getAttribute(attr)
  if (!val?.trim()) return []
  return val
    .trim()
    .split(/\s+/)
    .filter((id) => !root.querySelector(`[id="${id}"]`))
}

// Walks child nodes skipping any subtree rooted at aria-hidden="true"
function getVisibleText(el: HTMLElement): string {
  if (el.getAttribute('aria-hidden') === 'true') return ''
  let result = ''
  for (const child of el.childNodes) {
    if (child.nodeType === 1) {
      result += getVisibleText(child as HTMLElement)
    } else if (child.nodeType === 3) {
      result += child.text ?? ''
    }
  }
  return result
}

function getAccessibleName(el: HTMLElement, root: HTMLElement): string {
  const text = getVisibleText(el).trim()
  if (text) return text

  const ariaLabel = el.getAttribute('aria-label')?.trim()
  if (ariaLabel) return ariaLabel

  const title = el.getAttribute('title')?.trim()
  if (title) return title

  const childImg = el.querySelector('img')
  const childAlt = childImg?.getAttribute('alt')?.trim()
  if (childAlt) return childAlt

  const labelledBy = el.getAttribute('aria-labelledby')
  if (labelledBy) {
    const name = labelledBy
      .trim()
      .split(/\s+/)
      .map((id) => root.querySelector(`[id="${id}"]`)?.text.trim() ?? '')
      .join(' ')
      .trim()
    if (name) return name
  }

  return ''
}

export function checkImages(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 1.1.1 Non-text Content'
  const issues: A11yIssue[] = []

  root.querySelectorAll('img').forEach((img) => {
    const alt = img.getAttribute('alt')
    const ariaLabel = img.getAttribute('aria-label')?.trim()
    const labelledBy = img.getAttribute('aria-labelledby')
    const hasAriaName = !!(ariaLabel || labelledBy)

    if (alt === undefined) {
      if (hasAriaName) {
        issues.push({
          type: 'warning',
          rule: ruleName,
          element: clip(img.outerHTML),
          message:
            '<img> uses aria-label/aria-labelledby but the alt attribute is recommended for broader screen reader compatibility',
          fix: injectAttr(
            img.outerHTML,
            'alt',
            ariaLabel ?? '[Describe the image]'
          ),
          suggestedPatch: {
            selector: getElementSelector(img, root),
            action: 'setAttribute',
            attribute: 'alt',
            value: ariaLabel ?? '[Describe the image]'
          }
        })
      } else {
        issues.push({
          type: 'error',
          rule: ruleName,
          element: clip(img.outerHTML),
          message: '<img> is missing the alt attribute',
          fix: injectAttr(img.outerHTML, 'alt', '[Describe the image]'),
          suggestedPatch: {
            selector: getElementSelector(img, root),
            action: 'setAttribute',
            attribute: 'alt',
            value: '[Describe the image]'
          }
        })
      }
      return
    }

    if (alt.trim() === '' && !isDecorative(img)) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(img.outerHTML),
        message:
          '<img> has an empty alt but is not marked as decorative - add role="presentation" or provide a description',
        fix: injectAttr(img.outerHTML, 'role', 'presentation'),
        suggestedPatch: {
          selector: getElementSelector(img, root),
          action: 'setAttribute',
          attribute: 'role',
          value: 'presentation'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkFormLabels(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 1.3.1 Form Labels'
  const issues: A11yIssue[] = []
  const UNLABELED_SKIP = new Set([
    'hidden',
    'submit',
    'reset',
    'button',
    'image'
  ])

  for (const tag of ['input', 'select', 'textarea'] as const) {
    root.querySelectorAll(tag).forEach((el) => {
      if (tag === 'input') {
        const type = (el.getAttribute('type') ?? 'text').toLowerCase()
        if (UNLABELED_SKIP.has(type)) return
      }

      const id = el.getAttribute('id')
      const hasExplicit = id
        ? !!root.querySelector(`label[for="${id}"]`)
        : false
      const hasImplicit = !!el.closest('label')
      const ariaLabel = el.getAttribute('aria-label')?.trim()
      const ariaLabelledBy = el.getAttribute('aria-labelledby')
      const hasTitle = !!el.getAttribute('title')?.trim()

      if (
        !hasExplicit &&
        !hasImplicit &&
        !ariaLabel &&
        !ariaLabelledBy &&
        !hasTitle
      ) {
        const fixContent = id
          ? `<label for="${id}">[Label text]</label>\n${el.outerHTML}`
          : `<label>[Label text] ${el.outerHTML}</label>`
        issues.push({
          type: 'error',
          rule: ruleName,
          element: clip(el.outerHTML),
          message: `<${tag}> is not associated with a <label> - use for/id, wrapping label, or aria-label`,
          fix: fixContent,
          suggestedPatch: {
            selector: getElementSelector(el, root),
            action: 'replaceOuterHTML',
            value: fixContent
          }
        })
        return
      }

      // Verify aria-labelledby targets actually exist in the DOM
      if (ariaLabelledBy) {
        const broken = findBrokenAriaRefs(el, 'aria-labelledby', root)
        if (broken.length > 0) {
          issues.push({
            type: 'error',
            rule: ruleName,
            element: clip(el.outerHTML),
            message: `<${tag}> aria-labelledby references non-existent element(s): ${broken.map((id) => `#${id}`).join(', ')}`,
            fix: `Ensure element(s) with id="${broken.join('", "')}" exist in the DOM, or use aria-label instead`
          })
        }
      }
    })
  }

  root.querySelectorAll('fieldset').forEach((fieldset) => {
    const legend = fieldset.querySelector('legend')
    if (!legend || !legend.text.trim()) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: '<fieldset>',
        message:
          '<fieldset> must have a non-empty <legend> to group related form controls',
        fix: `<fieldset>\n  <legend>[Group label]</legend>\n  ...\n</fieldset>`,
        suggestedPatch: {
          selector: getElementSelector(fieldset, root),
          action: 'replaceOuterHTML',
          value: `<fieldset>\n  <legend>[Group label]</legend>${fieldset.innerHTML}\n</fieldset>`
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkEmptyLabels(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 2.4.6 Empty Labels'
  const issues: A11yIssue[] = []

  root.querySelectorAll('label').forEach((label) => {
    const hasText = !!label.text.trim()
    const hasAriaLabel = !!label.getAttribute('aria-label')?.trim()

    if (!hasText && !hasAriaLabel) {
      const fixContent = label.outerHTML.replace('</label>', '[Label text]</label>')
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(label.outerHTML),
        message:
          '<label> is empty and provides no accessible name for its control',
        fix: fixContent,
        suggestedPatch: {
          selector: getElementSelector(label, root),
          action: 'replaceOuterHTML',
          value: fixContent
        }
      })
    }

    // Check broken label[for] association
    const forAttr = label.getAttribute('for')
    if (forAttr && !root.querySelector(`[id="${forAttr}"]`)) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(label.outerHTML),
        message: `<label for="${forAttr}"> references id="${forAttr}" which does not exist in the DOM`,
        fix: `Add id="${forAttr}" to the target form element, or correct the for attribute`
      })
    }
  })

  return { ruleName, issues }
}

export function checkButtons(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 4.1.2 Button Names'
  const issues: A11yIssue[] = []

  root.querySelectorAll('button').forEach((button) => {
    if (!getAccessibleName(button, root)) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(button.outerHTML),
        message:
          '<button> has no accessible name - add text content, aria-label, or a child <img> with alt',
        fix: injectAttr(button.outerHTML, 'aria-label', '[Action description]'),
        suggestedPatch: {
          selector: getElementSelector(button, root),
          action: 'setAttribute',
          attribute: 'aria-label',
          value: '[Action description]'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkLinks(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 2.4.4 Link Purpose'
  const issues: A11yIssue[] = []
  const VAGUE = new Set([
    'click here',
    'here',
    'read more',
    'more',
    'link',
    'click',
    'learn more',
    'details',
    'info'
  ])

  root.querySelectorAll('a').forEach((link) => {
    const name = getAccessibleName(link, root)
    const href = link.getAttribute('href')
    const isButtonRole = link.getAttribute('role') === 'button'

    if (!name) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(link.outerHTML),
        message:
          '<a> has no accessible name - add text, aria-label, or a child <img> with alt',
        fix: injectAttr(
          link.outerHTML,
          'aria-label',
          '[Describe the link destination]'
        ),
        suggestedPatch: {
          selector: getElementSelector(link, root),
          action: 'setAttribute',
          attribute: 'aria-label',
          value: '[Describe the link destination]'
        }
      })
      return
    }

    if (VAGUE.has(name.toLowerCase())) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(link.outerHTML),
        message: `<a> has non-descriptive text "${name}" - use aria-label to clarify the destination`,
        fix: injectAttr(
          link.outerHTML,
          'aria-label',
          '[Describe where this link goes]'
        ),
        suggestedPatch: {
          selector: getElementSelector(link, root),
          action: 'setAttribute',
          attribute: 'aria-label',
          value: '[Describe where this link goes]'
        }
      })
    }

    if (!href && !isButtonRole) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(link.outerHTML),
        message:
          '<a> has no href - use <button> for actions, or add a valid href',
        fix: link.outerHTML.replace(/^<a\b/, '<a href="#"'),
        suggestedPatch: {
          selector: getElementSelector(link, root),
          action: 'setAttribute',
          attribute: 'href',
          value: '#'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkAriaStates(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 3.3.1 Error Identification'
  const issues: A11yIssue[] = []

  // aria-invalid="true" must have aria-describedby pointing to an existing element
  root.querySelectorAll('[aria-invalid]').forEach((el) => {
    const invalidVal = el.getAttribute('aria-invalid')
    const VALID_INVALID_VALUES = new Set([
      'false',
      'true',
      'grammar',
      'spelling'
    ])

    if (!VALID_INVALID_VALUES.has(invalidVal ?? '')) {
      issues.push({
        type: 'warning',
        rule: 'WCAG 4.1.2 ARIA State Values',
        element: clip(el.outerHTML),
        message: `aria-invalid="${invalidVal}" is not valid - use "true", "false", "grammar", or "spelling"`,
        fix: el.outerHTML.replace(
          `aria-invalid="${invalidVal}"`,
          'aria-invalid="true"'
        ),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-invalid',
          value: 'true'
        }
      })
      return
    }

    if (invalidVal === 'true') {
      const describedBy = el.getAttribute('aria-describedby')
      if (!describedBy) {
        issues.push({
          type: 'error',
          rule: ruleName,
          element: clip(el.outerHTML),
          message:
            'Element with aria-invalid="true" must have aria-describedby pointing to the error message element',
          fix: injectAttr(el.outerHTML, 'aria-describedby', 'error-message-id'),
          suggestedPatch: {
            selector: getElementSelector(el, root),
            action: 'setAttribute',
            attribute: 'aria-describedby',
            value: 'error-message-id'
          }
        })
      } else {
        // Verify the describedby target exists
        const broken = findBrokenAriaRefs(el, 'aria-describedby', root)
        if (broken.length > 0) {
          issues.push({
            type: 'error',
            rule: ruleName,
            element: clip(el.outerHTML),
            message: `aria-describedby references non-existent element(s): ${broken.map((id) => `#${id}`).join(', ')}`,
            fix: `Ensure element(s) with id="${broken.join('", "')}" exist in the DOM`
          })
        }
      }
    }
  })

  // Strictly boolean ARIA attributes (only "true" or "false" valid)
  const BOOLEAN_ARIA_ATTRS = [
    'aria-busy',
    'aria-expanded',
    'aria-selected',
    'aria-pressed'
  ]
  for (const attr of BOOLEAN_ARIA_ATTRS) {
    root.querySelectorAll(`[${attr}]`).forEach((el) => {
      const val = el.getAttribute(attr)
      if (val !== 'true' && val !== 'false') {
        issues.push({
          type: 'warning',
          rule: 'WCAG 4.1.2 ARIA State Values',
          element: clip(el.outerHTML),
          message: `${attr} must be "true" or "false", got "${val}"`,
          fix: el.outerHTML.replace(`${attr}="${val}"`, `${attr}="true"`),
          suggestedPatch: {
            selector: getElementSelector(el, root),
            action: 'setAttribute',
            attribute: attr,
            value: 'true'
          }
        })
      }
    })
  }

  // aria-checked also allows "mixed" for tri-state checkboxes (WAI-ARIA spec)
  root.querySelectorAll('[aria-checked]').forEach((el) => {
    const val = el.getAttribute('aria-checked')
    if (val !== 'true' && val !== 'false' && val !== 'mixed') {
      issues.push({
        type: 'warning',
        rule: 'WCAG 4.1.2 ARIA State Values',
        element: clip(el.outerHTML),
        message: `aria-checked must be "true", "false", or "mixed" (for tri-state), got "${val}"`,
        fix: el.outerHTML.replace(
          `aria-checked="${val}"`,
          'aria-checked="false"'
        ),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-checked',
          value: 'false'
        }
      })
    }
  })

  // aria-live with invalid value
  const VALID_ARIA_LIVE = new Set(['off', 'polite', 'assertive'])
  root.querySelectorAll('[aria-live]').forEach((el) => {
    const val = el.getAttribute('aria-live') ?? ''
    if (!VALID_ARIA_LIVE.has(val)) {
      issues.push({
        type: 'warning',
        rule: 'WCAG 4.1.2 ARIA State Values',
        element: clip(el.outerHTML),
        message: `aria-live="${val}" is not valid - use "off", "polite", or "assertive"`,
        fix: el.outerHTML.replace(`aria-live="${val}"`, 'aria-live="polite"'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-live',
          value: 'polite'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkDuplicateIds(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 4.1.1 Parsing'
  const issues: A11yIssue[] = []
  const seen = new Map<string, number>()

  root.querySelectorAll('[id]').forEach((el) => {
    const id = el.getAttribute('id')

    // Empty id is invalid HTML and breaks all ARIA references
    if (id !== undefined && id.trim() === '') {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(el.outerHTML),
        message: 'id="" is an empty ID - IDs must have a non-empty value',
        fix: el.outerHTML.replace('id=""', 'id="[unique-id]"'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'id',
          value: '[unique-id]'
        }
      })
      return
    }

    if (id) seen.set(id, (seen.get(id) ?? 0) + 1)
  })

  seen.forEach((count, id) => {
    if (count > 1) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: `id="${id}"`,
        message: `id="${id}" is used ${count} times - IDs must be unique within a document`,
        fix: `Keep one element with id="${id}" and rename all duplicates to unique IDs`
      })
    }
  })

  return { ruleName, issues }
}

export function checkTabIndex(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 2.1.1 Keyboard'
  const issues: A11yIssue[] = []

  root.querySelectorAll('[tabindex]').forEach((el) => {
    const raw = el.getAttribute('tabindex') ?? ''
    const val = parseInt(raw, 10)

    if (isNaN(val)) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(el.outerHTML),
        message: `tabindex="${raw}" is not a valid integer`,
        fix: el.outerHTML.replace(`tabindex="${raw}"`, 'tabindex="0"'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'tabindex',
          value: '0'
        }
      })
      return
    }

    if (val > 0) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(el.outerHTML),
        message: `tabindex="${val}" disrupts natural tab order - use tabindex="0" or rely on DOM order`,
        fix: el.outerHTML.replace(`tabindex="${val}"`, 'tabindex="0"'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'tabindex',
          value: '0'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkHeadings(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 2.4.6 Heading Hierarchy'
  const issues: A11yIssue[] = []
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6')

  let lastLevel = 0
  let h1Count = 0

  headings.forEach((h) => {
    const tag = h.tagName.toLowerCase()
    const level = parseInt(h.tagName.slice(1), 10)

    if (!h.text.trim()) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(h.outerHTML),
        message: `<${tag}> is empty - headings must have descriptive text`,
        fix: `<${tag}>[Heading text]</${tag}>`,
        suggestedPatch: {
          selector: getElementSelector(h, root),
          action: 'replaceOuterHTML',
          value: `<${tag}>[Heading text]</${tag}>`
        }
      })
    }

    if (level === 1) h1Count++

    if (lastLevel > 0 && level > lastLevel + 1) {
      const fixContent = `<h${lastLevel + 1}>${h.text.trim() || '[Heading text]'}</h${lastLevel + 1}>`
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(h.outerHTML),
        message: `Heading skips from h${lastLevel} to h${level} - use h${lastLevel + 1} to maintain document outline`,
        fix: fixContent,
        suggestedPatch: {
          selector: getElementSelector(h, root),
          action: 'replaceOuterHTML',
          value: fixContent
        }
      })
    }

    lastLevel = level
  })

  if (h1Count > 1) {
    issues.push({
      type: 'warning',
      rule: ruleName,
      element: 'h1',
      message: `${h1Count} <h1> elements found - a page should have exactly one <h1>`,
      fix: 'Demote additional <h1> elements to <h2> or lower'
    })
  }

  return { ruleName, issues }
}

export function checkTables(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 1.3.1 Table Structure'
  const issues: A11yIssue[] = []

  root.querySelectorAll('table').forEach((table) => {
    // Layout/presentational tables do not need captions or headers
    const role = table.getAttribute('role')
    if (role === 'presentation' || role === 'none') return

    const caption = table.querySelector('caption')
    const ariaLabel = table.getAttribute('aria-label')
    const ariaLabelledBy = table.getAttribute('aria-labelledby')

    if (!caption && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: '<table>',
        message:
          '<table> has no caption, aria-label, or aria-labelledby - screen readers cannot identify its purpose',
        fix: injectAttr('<table>', 'aria-label', '[Describe the table]'),
        suggestedPatch: {
          selector: getElementSelector(table, root),
          action: 'setAttribute',
          attribute: 'aria-label',
          value: '[Describe the table]'
        }
      })
    }

    // Empty caption is as bad as no caption
    if (caption && !caption.text.trim()) {
      const fixContent = caption.outerHTML.replace(
        '</caption>',
        '[Table description]</caption>'
      )
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(caption.outerHTML),
        message:
          '<caption> is empty - provide a meaningful description of the table',
        fix: fixContent,
        suggestedPatch: {
          selector: getElementSelector(caption, root),
          action: 'replaceOuterHTML',
          value: fixContent
        }
      })
    }

    table.querySelectorAll('th').forEach((th) => {
      if (!th.getAttribute('scope')) {
        issues.push({
          type: 'warning',
          rule: ruleName,
          element: clip(th.outerHTML),
          message:
            '<th> is missing the scope attribute - use scope="col" for column headers or scope="row" for row headers',
          fix: injectAttr(th.outerHTML, 'scope', 'col'),
          suggestedPatch: {
            selector: getElementSelector(th, root),
            action: 'setAttribute',
            attribute: 'scope',
            value: 'col'
          }
        })
      }
    })
  })

  return { ruleName, issues }
}

export function checkDialogs(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 4.1.2 Dialog Accessibility'
  const issues: A11yIssue[] = []

  root.querySelectorAll('dialog').forEach((dialog) => {
    const id = dialog.getAttribute('id')
    const ariaLabel = dialog.getAttribute('aria-label')
    const ariaLabelledBy = dialog.getAttribute('aria-labelledby')

    if (!id) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: '<dialog>',
        message:
          '<dialog> has no id - required by the ignix-lite button[onclick="dialogId.showModal()"] pattern',
        fix: injectAttr('<dialog>', 'id', 'dialog-id'),
        suggestedPatch: {
          selector: getElementSelector(dialog, root),
          action: 'setAttribute',
          attribute: 'id',
          value: 'dialog-id'
        }
      })
    }

    if (!ariaLabel && !ariaLabelledBy) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: '<dialog>',
        message:
          '<dialog> has no accessible name - add aria-labelledby pointing to a heading inside, or aria-label',
        fix: id
          ? `<dialog id="${id}" aria-labelledby="dialog-title">...</dialog>`
          : `<dialog aria-label="[Dialog purpose]">...</dialog>`,
        suggestedPatch: {
          selector: getElementSelector(dialog, root),
          action: 'setAttribute',
          attribute: id ? 'aria-labelledby' : 'aria-label',
          value: id ? 'dialog-title' : '[Dialog purpose]'
        }
      })
    } else if (ariaLabelledBy) {
      // Verify the labelledby target exists
      const broken = findBrokenAriaRefs(dialog, 'aria-labelledby', root)
      if (broken.length > 0) {
        issues.push({
          type: 'error',
          rule: ruleName,
          element: '<dialog>',
          message: `dialog aria-labelledby references non-existent element(s): ${broken.map((id) => `#${id}`).join(', ')}`,
          fix: `Ensure element(s) with id="${broken.join('", "')}" exist inside the dialog`
        })
      }
    }
  })

  return { ruleName, issues }
}

export function checkRoles(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 4.1.2 ARIA Role Requirements'
  const issues: A11yIssue[] = []
  const NATIVELY_INTERACTIVE = new Set([
    'a',
    'button',
    'input',
    'select',
    'textarea',
    'details',
    'summary'
  ])

  root.querySelectorAll('[role="button"]').forEach((el) => {
    const tag = el.tagName.toLowerCase()
    const tabIndex = el.getAttribute('tabindex')
    if (!NATIVELY_INTERACTIVE.has(tag) && tabIndex !== '0') {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(el.outerHTML),
        message:
          'Element with role="button" must have tabindex="0" to be keyboard-accessible',
        fix: injectAttr(el.outerHTML, 'tabindex', '0'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'tabindex',
          value: '0'
        }
      })
    }
  })

  // Roles requiring aria-checked
  for (const role of [
    'checkbox',
    'radio',
    'menuitemcheckbox',
    'menuitemradio'
  ] as const) {
    root.querySelectorAll(`[role="${role}"]`).forEach((el) => {
      if (!el.getAttribute('aria-checked')) {
        issues.push({
          type: 'error',
          rule: ruleName,
          element: clip(el.outerHTML),
          message: `role="${role}" requires aria-checked attribute (values: "true", "false"${role === 'checkbox' ? ', "mixed"' : ''})`,
          fix: injectAttr(el.outerHTML, 'aria-checked', 'false'),
          suggestedPatch: {
            selector: getElementSelector(el, root),
            action: 'setAttribute',
            attribute: 'aria-checked',
            value: 'false'
          }
        })
      }
    })
  }

  root.querySelectorAll('[role="combobox"]').forEach((el) => {
    if (!el.getAttribute('aria-expanded')) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(el.outerHTML),
        message: 'role="combobox" requires aria-expanded attribute',
        fix: injectAttr(el.outerHTML, 'aria-expanded', 'false'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-expanded',
          value: 'false'
        }
      })
    }
  })

  // Roles requiring aria-selected
  for (const role of ['tab', 'option', 'treeitem', 'gridcell'] as const) {
    root.querySelectorAll(`[role="${role}"]`).forEach((el) => {
      if (!el.getAttribute('aria-selected')) {
        issues.push({
          type: 'error',
          rule: ruleName,
          element: clip(el.outerHTML),
          message: `role="${role}" requires aria-selected attribute`,
          fix: injectAttr(el.outerHTML, 'aria-selected', 'false'),
          suggestedPatch: {
            selector: getElementSelector(el, root),
            action: 'setAttribute',
            attribute: 'aria-selected',
            value: 'false'
          }
        })
      }
    })
  }

  root.querySelectorAll('[role="slider"]').forEach((el) => {
    const required = ['aria-valuenow', 'aria-valuemin', 'aria-valuemax']
    const missing = required.filter((attr) => !el.getAttribute(attr))
    if (missing.length > 0) {
      issues.push({
        type: 'error',
        rule: ruleName,
        element: clip(el.outerHTML),
        message: `role="slider" is missing required attributes: ${missing.join(', ')}`,
        fix: 'Add aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" to the element',
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'replaceOuterHTML',
          value: el.outerHTML
            .replace(/^(<[a-zA-Z][a-zA-Z0-9-]*)/, `$1 aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"`)
        }
      })
    }
  })

  root.querySelectorAll('[role="progressbar"]').forEach((el) => {
    if (
      !el.getAttribute('aria-valuenow') &&
      !el.getAttribute('aria-valuetext')
    ) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(el.outerHTML),
        message:
          'role="progressbar" should have aria-valuenow or aria-valuetext to communicate current progress',
        fix: injectAttr(el.outerHTML, 'aria-valuenow', '0'),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-valuenow',
          value: '0'
        }
      })
    }
  })

  root.querySelectorAll('[role="listbox"]').forEach((el) => {
    if (!getAccessibleName(el, root)) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(el.outerHTML),
        message:
          'role="listbox" should have an accessible name via aria-label or aria-labelledby',
        fix: injectAttr(
          el.outerHTML,
          'aria-label',
          '[Describe the list options]'
        ),
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'setAttribute',
          attribute: 'aria-label',
          value: '[Describe the list options]'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkAutocomplete(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 1.3.5 Input Purpose'
  const issues: A11yIssue[] = []

  const TYPE_AUTOCOMPLETE: Record<string, string> = {
    email: 'email',
    tel: 'tel',
    url: 'url'
  }

  root.querySelectorAll('input').forEach((input) => {
    const type = (input.getAttribute('type') ?? 'text').toLowerCase()
    const expected = TYPE_AUTOCOMPLETE[type]

    if (expected && !input.getAttribute('autocomplete')) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(input.outerHTML),
        message: `<input type="${type}"> should have autocomplete="${expected}" to assist users with autofill`,
        fix: injectAttr(input.outerHTML, 'autocomplete', expected),
        suggestedPatch: {
          selector: getElementSelector(input, root),
          action: 'setAttribute',
          attribute: 'autocomplete',
          value: expected
        }
      })
    }

    if (type === 'password' && !input.getAttribute('autocomplete')) {
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(input.outerHTML),
        message:
          '<input type="password"> should have autocomplete="current-password" or autocomplete="new-password"',
        fix: injectAttr(input.outerHTML, 'autocomplete', 'current-password'),
        suggestedPatch: {
          selector: getElementSelector(input, root),
          action: 'setAttribute',
          attribute: 'autocomplete',
          value: 'current-password'
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkFocusStyle(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 2.4.7 Focus Visible'
  const issues: A11yIssue[] = []
  const KILLS_FOCUS = [
    /outline\s*:\s*none/i,
    /outline\s*:\s*0(?:px)?/i,
    /outline-width\s*:\s*0/i
  ]

  root.querySelectorAll('[style]').forEach((el) => {
    const style = el.getAttribute('style') ?? ''
    if (KILLS_FOCUS.some((rx) => rx.test(style))) {
      const fixContent = el.outerHTML
        .replace(/outline\s*:\s*(none|0(?:px)?)\s*;?/gi, '')
        .replace(/outline-width\s*:\s*0\s*;?/gi, '')
      issues.push({
        type: 'warning',
        rule: ruleName,
        element: clip(el.outerHTML),
        message:
          'Inline style removes the focus outline - keyboard users cannot see the focus indicator',
        fix: fixContent,
        suggestedPatch: {
          selector: getElementSelector(el, root),
          action: 'replaceOuterHTML',
          value: fixContent
        }
      })
    }
  })

  return { ruleName, issues }
}

export function checkLang(root: HTMLElement): RuleResult {
  const ruleName = 'WCAG 3.1.1 Language of Page'
  const issues: A11yIssue[] = []

  const htmlEl = root.querySelector('html')
  if (htmlEl && !htmlEl.getAttribute('lang')?.trim()) {
    issues.push({
      type: 'error',
      rule: ruleName,
      element: '<html>',
      message:
        '<html> is missing the lang attribute - screen readers need this to select the correct voice/language',
      fix: '<html lang="en">',
      suggestedPatch: {
        selector: getElementSelector(htmlEl, root),
        action: 'setAttribute',
        attribute: 'lang',
        value: 'en'
      }
    })
  }

  return { ruleName, issues }
}


