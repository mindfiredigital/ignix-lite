import emmet from 'emmet'

// Expand Emmet shorthand to full HTML using the emmet npm package
export function expandEmmet(emmetStr: string): string {
  try {
    return emmet(emmetStr)
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

export function interpolateEmmet(
  emmetStr: string,
  description: string
): string {
  let result = emmetStr

  // 1. Color/Intent overrides based on keywords in description
  const descLower = description.toLowerCase()
  if (/\b(red|danger|delete|remove|destroy)\b/.test(descLower)) {
    // replace any data-intent of primary/neutral/ghost with danger
    result = result.replace(
      /data-intent=(?:primary|neutral|ghost)/g,
      'data-intent=danger'
    )
  } else if (/\b(green|success|work|done)\b/.test(descLower)) {
    result = result.replace(
      /data-intent=(?:primary|neutral|ghost)/g,
      'data-intent=success'
    )
  } else if (/\b(yellow|orange|warning|risky)\b/.test(descLower)) {
    result = result.replace(
      /data-intent=(?:primary|neutral|ghost)/g,
      'data-intent=warning'
    )
  }

  // 2. Extract quoted strings for label/text overrides
  const matches = [...description.matchAll(/['"]([^'"]+)['"]/g)]
  const quotedStrings = matches
    .map((m) => m[1].trim())
    .filter((s) => s.length > 0)

  if (quotedStrings.length > 0) {
    const hasButtonMention = /\b(button|says|labeled|action|click)\b/i.test(
      description
    )


    const shouldReplaceButton =
      quotedStrings.length >= 2 ||
      (quotedStrings.length === 1 && hasButtonMention)

    if (shouldReplaceButton) {
      const buttonRegex = /(button[^}]*)\{([^}]+)\}/g
      const buttonMatches = [...result.matchAll(buttonRegex)]

      if (buttonMatches.length > 0) {
        const buttonLabel = quotedStrings[quotedStrings.length - 1]
        result = result.replace(buttonRegex, (match, p1) => {
          return `${p1}{${buttonLabel}}`
        })
        quotedStrings.pop()
      }
    }

    // Replace label text in order with the remaining quoted strings
    const labelRegex = /label\{([^}]+)\}/g
    let quoteIndex = 0
    result = result.replace(labelRegex, (match) => {
      if (quoteIndex < quotedStrings.length) {
        return `label{${quotedStrings[quoteIndex++]}}`
      }
      return match
    })

    // Auto-adapt input type: if label contains "username", change type=email to type=text
    if (/label\{username\}/i.test(result)) {
      result = result.replace(/type=email/g, 'type=text')
    }
  }

  return result
}
