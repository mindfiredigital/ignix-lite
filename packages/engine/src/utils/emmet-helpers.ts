import emmet from 'emmet'
import { parse } from 'node-html-parser'

export function stabilizeHtml(html: string): string {
  try {
    const root = parse(html)
    const traverse = (node: any) => {
      if (node.nodeType === 1) {
        const attrs = { ...node.rawAttributes }
        const sortedKeys = Object.keys(attrs).sort()
        for (const key of Object.keys(attrs)) {
          node.removeAttribute(key)
        }
        for (const key of sortedKeys) {
          const val = attrs[key]
          node.setAttribute(key, (val === null || val === undefined) ? '' : val)
        }
      }
      for (const child of node.childNodes) {
        traverse(child)
      }
    }
    traverse(root)
    return root.toString()
  } catch {
    return html
  }
}

// Expand Emmet shorthand to full HTML using the emmet npm package
export function expandEmmet(emmetStr: string): string {
  try {
    const expanded = emmet(emmetStr)
    return stabilizeHtml(expanded)
  } catch {
    return `<!-- expand: ${emmetStr} -->`
  }
}

// Maps HTML element names / web-component tag names → ignix-lite component names
export const ELEMENT_TO_COMPONENT: Record<string, string> = {
  // Native elements
  button: 'button',
  input: 'input',
  textarea: 'textarea',
  select: 'select',
  form: 'form',
  dialog: 'dialog',
  details: 'accordion',
  summary: 'accordion',
  progress: 'progress',
  meter: 'meter',
  aside: 'alert',
  mark: 'badge',
  img: 'avatar',
  article: 'card',
  nav: 'navigation',
  table: 'table',
  pre: 'codeblock',
  code: 'codeblock',
  hr: 'divider',
  label: 'input', // label wraps input/checkbox/radio
  // Web components
  'ix-tabs': 'tab',
  'ix-dropdown': 'dropdown',
  'ix-combobox': 'combobox',
  'ix-tooltip': 'tooltip',
  'ix-toast': 'toast'
}

// Skeleton heuristic: span with aria-busy or data-shape
export const SKELETON_PATTERN = /span\[[^\]]*(?:aria-busy|data-shape)[^\]]*\]/i

// Given an emmet string, return the unique set of ignix-lite component names hat the pattern uses.

export function extractComponents(emmetStr: string): string[] {
  const found = new Set<string>()

  // Special case: skeleton uses span[aria-busy] or span[data-shape]
  if (SKELETON_PATTERN.test(emmetStr)) {
    found.add('skeleton')
  }

  // Special case: nav[aria-label=Breadcrumb] → breadcrumb
  if (/nav\[[^\]]*breadcrumb/i.test(emmetStr)) {
    found.add('breadcrumb')
  } else if (/\bnav\b/.test(emmetStr)) {
    found.add('navigation')
  }

  // Special case: label > input[type=checkbox] → checkbox
  if (/input\[[^\]]*type=checkbox/i.test(emmetStr)) {
    found.add('checkbox')
  }

  // Special case: label > input[type=radio] → radio
  if (/input\[[^\]]*type=radio/i.test(emmetStr)) {
    found.add('radio')
  }

  // Special case: section[data-grid] → grid (only when data-grid attr is present)
  if (/section\[[^\]]*data-grid/i.test(emmetStr)) {
    found.add('grid')
  }

  // General: extract all tag names from the emmet string
  const tagPattern = /(?:^|[>+(])([a-z][a-z0-9-]*)/gi
  let m: RegExpExecArray | null
  while ((m = tagPattern.exec(emmetStr)) !== null) {
    const tag = m[1].toLowerCase()
    const component = ELEMENT_TO_COMPONENT[tag]
    if (component) found.add(component)
  }

  return Array.from(found)
}

// Customizes standard Emmet shorthand by dynamically replacing text strings and visual intent attributes based on the user prompt description.

function injectAttribute(emmetStr: string, attr: string, value: string): string {
  if (emmetStr.includes(attr)) return emmetStr
  const match = emmetStr.match(/^([a-z][a-z0-9-]*)(?:\[([^\]]*)\])?/i)
  if (!match) return emmetStr
  const tag = match[1]
  const attrs = match[2] ? `${attr}=${value} ${match[2]}` : `${attr}=${value}`
  return emmetStr.replace(/^([a-z][a-z0-9-]*)(?:\[[^\]]*\])?/i, `${tag}[${attrs}]`)
}

export function interpolateEmmet(
  emmetStr: string,
  description: string
): string {
  let result = emmetStr
  const descLower = description.toLowerCase()

  let intent = 'primary'
  if (/\b(red|danger|delete|remove|destroy)\b/.test(descLower)) {
    intent = 'danger'
  } else if (/\b(green|success|work|done)\b/.test(descLower)) {
    intent = 'success'
  } else if (/\b(yellow|orange|warning|risky)\b/.test(descLower)) {
    intent = 'warning'
  } else if (/\b(ghost|secondary)\b/.test(descLower)) {
    intent = 'ghost'
  } else if (/\b(neutral|gray|grey)\b/.test(descLower)) {
    intent = 'neutral'
  }
  result = result.replace(/data-intent=\?/g, `data-intent=${intent}`)

  // Only override data-intent on semantic elements, not wrappers like label
  const INTENT_ELEMENTS = /^(button|aside|mark|dialog|ix-tooltip|ix-toast)/
  if (intent !== 'primary') {
    result = result.replace(
      /data-intent=(?:primary|neutral|ghost|success|warning|danger)/g,
      (match, offset) => {
        // Walk backwards to find the tag name to avoid injecting on label
        const before = result.slice(0, offset)
        const tagMatch = before.match(/([a-z][a-z0-9-]*)\[[^\]]*$/i)
        if (tagMatch && !INTENT_ELEMENTS.test(tagMatch[1])) {
          return match // leave unchanged
        }
        return `data-intent=${intent}`
      }
    )
  }

  let size = 'md'
  if (/\b(large|lg|big)\b/.test(descLower)) {
    size = 'lg'
  } else if (/\b(small|sm|tiny)\b/.test(descLower)) {
    size = 'sm'
  }
  result = result.replace(/data-size=\?/g, `data-size=${size}`)

  let variant = 'solid'
  if (/\b(outline|ghost|link)\b/.test(descLower)) {
    variant = 'outline'
  }
  result = result.replace(/data-variant=\?/g, `data-variant=${variant}`)

  // Recognize shape keywords: rectangular → rect, circle/round → circle
  if (/\b(rect|rectangular|rectangle)\b/.test(descLower)) {
    result = result.replace(/data-shape=(?:text|circle|\?)/g, 'data-shape=rect')
  } else if (/\b(circle|round|circular)\b/.test(descLower)) {
    result = result.replace(/data-shape=(?:text|rect|\?)/g, 'data-shape=circle')
  }

  if (/\b(loading|spinner|busy)\b/.test(descLower)) {
    result = injectAttribute(result, 'aria-busy', 'true')
  }
  if (/\b(disabled|inactive)\b/.test(descLower)) {
    result = injectAttribute(result, 'disabled', 'true')
  }

  const matches = [...description.matchAll(/['"]([^'"]+)['"]/g)]
  const quotedStrings = matches
    .map((m) => m[1].trim())
    .filter((s) => s.length > 0)

  if (quotedStrings.length > 0) {
    let quoteIndex = 0

    result = result.replace(/content(=\?|=""|=''|(?=[\]\s]|$))/g, () => {
      if (quoteIndex < quotedStrings.length) {
        return `content="${quotedStrings[quoteIndex++]}"`
      }
      return 'content=""'
    })

    result = result.replace(/title(=\?|=""|=''|(?=[\]\s]|$))/g, () => {
      if (quoteIndex < quotedStrings.length) {
        return `title="${quotedStrings[quoteIndex++]}"`
      }
      return 'title=""'
    })

    result = result.replace(/label(=\?|=""|=''|(?=[\]\s]|$))/g, () => {
      if (quoteIndex < quotedStrings.length) {
        return `label="${quotedStrings[quoteIndex++]}"`
      }
      return 'label=""'
    })

    const hasButtonMention = /\b(button|says|labeled|action|click)\b/i.test(
      description
    )

    // Don't replace button labels when the only quoted string was already consumed as content=
    const remainingQuotes = quotedStrings.slice(quoteIndex)
    // Also skip if the emmet already has a populated content= attribute (e.g. from tooltip template)
    // — in that case the quoted string belongs to content, not the button label
    const hasPopulatedContent = /content="[^"]+"/i.test(result)
    const shouldReplaceButton =
      !hasPopulatedContent &&
      (remainingQuotes.length >= 2 ||
        (remainingQuotes.length === 1 && hasButtonMention))

    if (shouldReplaceButton) {
      const buttonRegex = /(button[^}]*)\{([^}]+)\}/g
      const buttonMatches = [...result.matchAll(buttonRegex)]

      if (buttonMatches.length > 0) {
        const buttonLabel = remainingQuotes[remainingQuotes.length - 1]
        result = result.replace(buttonRegex, (match, p1) => {
          return `${p1}{${buttonLabel}}`
        })
      }
    }



    const textPlaceholderRegex = /\{(label|message|title|text)\}/gi
    result = result.replace(textPlaceholderRegex, (match) => {
      if (quoteIndex < quotedStrings.length) {
        return `{${quotedStrings[quoteIndex++]}}`
      }
      return match
    })

    const labelRegex = /label\{([^}]+)\}/g
    result = result.replace(labelRegex, (match) => {
      if (quoteIndex < quotedStrings.length) {
        return `label{${quotedStrings[quoteIndex++]}}`
      }
      return match
    })

    if (/label\{username\}/i.test(result)) {
      result = result.replace(/type=email/g, 'type=text')
    }
  } else {
    const labelMap: Record<string, string> = {
      delete: 'Delete',
      remove: 'Remove',
      destroy: 'Destroy',
      danger: 'Delete',
      save: 'Save',
      submit: 'Submit',
      cancel: 'Cancel',
      confirm: 'Confirm',
      search: 'Search',
      download: 'Download',
      upload: 'Upload',
      edit: 'Edit',
      add: 'Add',
      create: 'Create',
      update: 'Update'
    }
    let extractedLabel = ''
    for (const [key, val] of Object.entries(labelMap)) {
      if (descLower.includes(key)) {
        extractedLabel = val
        break
      }
    }
    if (!extractedLabel) {
      const components = extractComponents(emmetStr)
      if (components.length > 0) {
        extractedLabel = components[0].charAt(0).toUpperCase() + components[0].slice(1)
      } else {
        extractedLabel = 'Button'
      }
    }
    result = result.replace(/\{(label|Label|message|Message|title|Title|text|Text)\}/g, `{${extractedLabel}}`)
  }

  result = result.replace(/alt=\?/g, 'alt="User"')
  result = result.replace(/src=\?/g, 'src="?"')

  return result
}
