import { parse } from 'node-html-parser'
import { manifests } from '../manifests/index.js'
import type { MCPResponse } from '../types.js'

type ErrorType =
  | 'UNKNOWN_ATTRIBUTE'
  | 'INVALID_VALUE'
  | 'FORBIDDEN_CLASS'
  | 'MISSING_REQUIRED'
  | 'WRONG_ELEMENT'
  | 'PROP_EXPLOSION'
  | 'JS_ON_CSS_COMPONENT'
  | 'MISSING_SLOT'

type ValidationError = {
  element: string
  prop: string
  type: ErrorType
  message: string
  suggestion?: string
  valid_values?: string[]
  fix: string
  confidence: number
}

export function validate(html: string): MCPResponse {
  const root = parse(html)

  const errors: ValidationError[] = []

  const elements = root.querySelectorAll('*')

  // SRS wrappers only
  const allowedWrappers = [
    'label',
    'span',
    'p',
    'img',
    'small',
    'h1',
    'h2',
    'h3',
    'a',
    'button',
    'ul',
    'li',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    'summary',
    'strong',
    'code',
  ]

  const nativeAttributes = new Set([
    'id',
    'role',
    'slot',
    'tabindex',

    'aria-label',
    'aria-live',
    'aria-hidden',
    'aria-expanded',
    'aria-selected',
    'aria-current',
    'aria-sort',
    'aria-invalid',
    'aria-describedby',
    'aria-labelledby',
    'aria-haspopup',
    'aria-busy',

    'disabled',
    'required',
    'checked',
    'multiple',
    'readonly',

    'type',
    'value',
    'placeholder',
    'name',

    'min',
    'max',
    'low',
    'high',
    'optimum',

    'rows',

    'open',
    'hidden',

    'href',

    'content',

    'is',

    'src',
    'alt',

    'data-intent',
    'data-position',
    'data-variant',
    'data-shape',
    'data-sortable',
    'data-open',
    'data-lines',

    'data-grid',
    'data-gap',
    'data-align',
    'data-justify',
    'data-col',
    'data-row',
    'data-dense',
    'data-ix-manifest'
  ])

  for (const el of elements) {
    const tag = el.tagName.toLowerCase()

    const attrs = el.attributes

    // self-describing DOM manifest overriding
    const dataIxManifest = el.getAttribute('data-ix-manifest')
    let manifestKey =
      dataIxManifest || (tag.startsWith('ix-') ? tag.slice(3) : tag)

    // built in table
    if (tag === 'table' && attrs.is === 'ix-table') {
      manifestKey = 'table'
    }

    // navigation
    if (tag === 'nav') {
      manifestKey = 'navigation'
    }

    // card
    if (tag === 'article' && el.querySelector('[slot]')) {
      manifestKey = 'card'
    }

    // aside -> alert
    if (tag === 'aside') {
      manifestKey = 'alert'
    }

    // details -> accordion
    if (tag === 'details') {
      manifestKey = 'accordion'
    }

    // hr -> divider
    if (tag === 'hr') {
      manifestKey = 'divider'
    }

    let manifest = manifests[manifestKey]

    // badge support
    if (!manifest) {
      if (tag === 'mark') {
        manifest = manifests.badge
      }

      if (tag === 'span' && attrs.role === 'status') {
        manifest = manifests.badge
      }
    }

    // invalid component
    if (!manifest && !allowedWrappers.includes(tag)) {
      errors.push({
        element: tag,
        prop: '',
        type: 'WRONG_ELEMENT',
        message: `<${tag}> is not a valid ignix-lite component`,
        fix: `<button>Fix me</button>`,
        confidence: 0.7
      })

      continue
    }

    // wrappers skip
    if (!manifest) continue

    const elementName = tag.startsWith('ix-') ? tag : manifest.element || tag

    // required wrapper
    if (manifest.required_wrapper) {
      const parent = el.parentNode as unknown as {
        tagName?: string
      }

      if (
        !parent ||
        parent.tagName?.toLowerCase() !== manifest.required_wrapper
      ) {
        errors.push({
          element: tag,
          prop: 'wrapper',
          type: 'MISSING_REQUIRED',
          message: `<${tag}> must be inside <${manifest.required_wrapper}>`,
          fix: `<${manifest.required_wrapper}><${elementName}></${elementName}></${manifest.required_wrapper}>`,
          confidence: 0.95
        })
      }
    }

    // badge rule
    if (
      tag === 'span' &&
      manifest.component === 'badge' &&
      attrs.role !== 'status'
    ) {
      errors.push({
        element: tag,

        prop: 'role',
        type: 'INVALID_VALUE',
        message: 'span badge must have role=status',
        fix: `<span role="status">${el.innerText}</span>`,
        confidence: 0.9
      })
    }

    // class forbidden
    if ('class' in attrs) {
      errors.push({
        element: tag,
        prop: 'class',
        type: 'FORBIDDEN_CLASS',
        message: 'class attribute not allowed',
        fix: `<${elementName}>${el.innerText}</${elementName}>`,
        confidence: 0.99
      })
    }

    // prop explosion
    if (Object.keys(attrs).length > 4) {
      errors.push({
        element: tag,
        prop: 'multiple',
        type: 'PROP_EXPLOSION',
        message: 'Too many props',
        fix: `<${elementName}></${elementName}>`,
        confidence: 0.85
      })
    }

    // js handlers
    for (const attr of Object.keys(attrs)) {
      if (attr.startsWith('on')) {
        errors.push({
          element: tag,
          prop: attr,
          type: 'JS_ON_CSS_COMPONENT',
          message: 'JS handlers forbidden',
          fix: `<${elementName}></${elementName}>`,
          confidence: 0.95
        })
      }
    }

    // attribute validation
    for (const attr of Object.keys(attrs)) {
      if (manifest.forbidden_props?.includes(attr)) {
        errors.push({
          element: tag,
          prop: attr,
          type: 'UNKNOWN_ATTRIBUTE',
          message: `'${attr}' forbidden`,
          fix: `<${elementName}></${elementName}>`,
          confidence: 0.98
        })

        continue
      }

      if (!manifest.props?.[attr] && !nativeAttributes.has(attr)) {
        errors.push({
          element: tag,
          prop: attr,
          type: 'UNKNOWN_ATTRIBUTE',
          message: `'${attr}' invalid`,
          fix: `<${elementName}></${elementName}>`,
          confidence: 0.95
        })
      }
    }

    // enum validation
    for (const attr of Object.keys(attrs)) {
      const def = manifest.props?.[attr]

      if (def?.values) {
        const value = attrs[attr]

        if (!def.values.includes(value)) {
          errors.push({
            element: tag,
            prop: attr,
            type: 'INVALID_VALUE',
            message: `'${value}' invalid`,
            valid_values: def.values,
            fix: `<${elementName} ${attr}="${def.values[0]}"></${elementName}>`,
            confidence: 0.97
          })
        }
      }
    }

    // required props
    for (const req of manifest.required_props || []) {
      if (!(req in attrs)) {
        errors.push({
          element: tag,
          prop: req,
          type: 'MISSING_REQUIRED',
          message: `Missing ${req}`,
          fix: `<${elementName} ${req}=""></${elementName}>`,
          confidence: 0.9
        })
      }
    }

    // slot validation
    const slots = manifest.slots ?? {}

    for (const [slotName, slotDef] of Object.entries(slots)) {
      const child = el.querySelector(`[slot="${slotName}"]`)

      if (slotDef.required && !child) {
        errors.push({
          element: tag,
          prop: slotName,
          type: 'MISSING_SLOT',
          message: `Missing slot ${slotName}`,
          fix: `<${elementName}><span slot="${slotName}"></span></${elementName}>`,
          confidence: 0.95
        })
      }

      if (child && slotDef.element) {
        const childTag = child.tagName.toLowerCase()

        if (!slotDef.element.includes(childTag)) {
          errors.push({
            element: childTag,
            prop: slotName,
            type: 'INVALID_VALUE',
            message: `${childTag} invalid for slot ${slotName}`,
            valid_values: slotDef.element,
            fix: `<${slotDef.element[0]} slot="${slotName}"></${slotDef.element[0]}>`,
            confidence: 0.95
          })
        }
      }
    }
  }

  const valid = errors.length === 0
  const score = valid ? 100 : Math.max(0, 100 - errors.length * 10)

  return {
    content: [
      {
        type: 'text',

        text: JSON.stringify({
          valid,
          score,
          errors,
          tokens_used: 50
        })
      }
    ]
  }
}
