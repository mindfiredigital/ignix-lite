import { parse } from "node-html-parser"
import { manifests } from "../manifests/index.js"
import type { MCPResponse } from "../types.js"

type ErrorType =
  | "UNKNOWN_ATTRIBUTE"
  | "INVALID_VALUE"
  | "FORBIDDEN_CLASS"
  | "MISSING_REQUIRED"
  | "WRONG_ELEMENT"
  | "PROP_EXPLOSION"
  | "JS_ON_CSS_COMPONENT"
  | "MISSING_SLOT"

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

  const elements = root.querySelectorAll("*")

  const allowedWrappers = ["label", "div", "span"]

  for (const el of elements) {
    const tag = el.tagName.toLowerCase()
    const attrs = el.attributes

    let manifest = manifests[tag]

    // SPECIAL CASE: BADGE SUPPORT 
    if (!manifest) {
      if (tag === "mark") {
        manifest = manifests["badge"]
      }

      if (tag === "span" && attrs.role === "status") {
        manifest = manifests["badge"]
      }
    }

    // WRONG ELEMENT (skip wrappers)
    if (!manifest && !allowedWrappers.includes(tag)) {
      errors.push({
        element: tag,
        prop: "",
        type: "WRONG_ELEMENT",
        message: `<${tag}> is not a valid ignix-lite component`,
        fix: `<button>Fix me</button>`,
        confidence: 0.7
      })
      continue
    }

    //  skip wrappers
    if (!manifest) continue

    //  REQUIRED WRAPPER
    if (manifest.required_wrapper) {
      const parent = el.parentNode as unknown as { tagName?: string }

      if (!parent || parent.tagName?.toLowerCase() !== manifest.required_wrapper) {
        errors.push({
          element: tag,
          prop: "wrapper",
          type: "MISSING_REQUIRED",
          message: `<${tag}> must be inside <${manifest.required_wrapper}>`,
          fix: `<${manifest.required_wrapper}>Label <${tag} type="text" /></${manifest.required_wrapper}>`,
          confidence: 0.95
        })
      }
    }

    //  span without role=status (badge rule)
    if (tag === "span" && manifest.component === "badge" && attrs.role !== "status") {
      errors.push({
        element: tag,
        prop: "role",
        type: "INVALID_VALUE",
        message: "span badge must have role=status",
        fix: `<span role="status">${el.innerText}</span>`,
        confidence: 0.9
      })
    }

    //  FORBIDDEN CLASS
    if ("class" in attrs) {
      errors.push({
        element: tag,
        prop: "class",
        type: "FORBIDDEN_CLASS",
        message: "class attribute is not allowed",
        fix: `<${tag}>${el.innerText}</${tag}>`,
        confidence: 0.99
      })
    }

    //  PROP EXPLOSION
    if (Object.keys(attrs).length > 4) {
      errors.push({
        element: tag,
        prop: "multiple",
        type: "PROP_EXPLOSION",
        message: "Too many props on element",
        fix: `<${tag}>${el.innerText}</${tag}>`,
        confidence: 0.85
      })
    }

    //  JS HANDLER
    for (const attr of Object.keys(attrs)) {
      if (attr.startsWith("on")) {
        errors.push({
          element: tag,
          prop: attr,
          type: "JS_ON_CSS_COMPONENT",
          message: "JS handlers not allowed",
          fix: `<${tag}>${el.innerText}</${tag}>`,
          confidence: 0.95
        })
      }
    }

    //  UNKNOWN + FORBIDDEN PROPS
    for (const attr of Object.keys(attrs)) {
      if (manifest.forbidden_props?.includes(attr)) {
        errors.push({
          element: tag,
          prop: attr,
          type: "UNKNOWN_ATTRIBUTE",
          message: `'${attr}' is not allowed`,
          suggestion: "data-intent",
          valid_values: manifest.props?.["data-intent"]?.values,
          fix: `<${tag} data-intent="neutral">${el.innerText}</${tag}>`,
          confidence: 0.98
        })
        continue
      }

      if (!manifest.props?.[attr]) {
        errors.push({
          element: tag,
          prop: attr,
          type: "UNKNOWN_ATTRIBUTE",
          message: `'${attr}' is not valid`,
          suggestion: "data-intent",
          valid_values: manifest.props?.["data-intent"]?.values,
          fix: `<${tag} data-intent="neutral">${el.innerText}</${tag}>`,
          confidence: 0.95
        })
      }
    }

    //  INVALID ENUM VALUE
    for (const attr of Object.keys(attrs)) {
      const def = manifest.props?.[attr]

      if (def?.values) {
        const value = attrs[attr]

        if (!def.values.includes(value)) {
          errors.push({
            element: tag,
            prop: attr,
            type: "INVALID_VALUE",
            message: `'${value}' is invalid`,
            valid_values: def.values,
            fix: `<${tag} ${attr}="${def.values[0]}">${el.innerText}</${tag}>`,
            confidence: 0.97
          })
        }
      }
    }

    //  BUTTON TEXT REQUIRED
    if (tag === "button" && !el.innerText.trim()) {
      errors.push({
        element: tag,
        prop: "text",
        type: "MISSING_REQUIRED",
        message: "Button must have text content",
        fix: `<button>Click</button>`,
        confidence: 0.9
      })
    }

    //  REQUIRED PROPS
    for (const req of manifest.required_props || []) {
      if (!(req in attrs)) {
        errors.push({
          element: tag,
          prop: req,
          type: "MISSING_REQUIRED",
          message: `Missing required prop: ${req}`,
          fix: `<${tag} ${req}="">${el.innerText}</${tag}>`,
          confidence: 0.9
        })
      }
    }

    //  MISSING SLOT
    for (const slot of manifest.required_slots || []) {
      if (!el.querySelector(`[slot=${slot}]`)) {
        errors.push({
          element: tag,
          prop: slot,
          type: "MISSING_SLOT",
          message: `Missing slot: ${slot}`,
          fix: `<${tag}><span slot="${slot}">...</span></${tag}>`,
          confidence: 0.85
        })
      }
    }
  }

  const valid = errors.length === 0
  const score = valid ? 100 : Math.max(0, 100 - errors.length * 10)

  return {
    content: [
      {
        type: "text",
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
