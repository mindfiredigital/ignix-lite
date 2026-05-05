import { describe, it, expect } from "vitest"
import { validate } from "../packages/mcp/src/tools/validator.js"
import type { MCPResponse } from "../packages/mcp/src/types.js"


function parse(res: MCPResponse) {
  return JSON.parse(res.content[0].text) as {
    valid: boolean
    score: number
    errors: {
      type: string
      prop: string
    }[]
  }
}

describe("Ignix Validate Tool", () => {

  it("detects UNKNOWN_ATTRIBUTE (forbidden prop like variant)", () => {
    const res = validate("<button variant='primary'>Click</button>")
    const data = parse(res)

    expect(data.valid).toBe(false)
    expect(data.errors.length).toBeGreaterThan(0)

 
    const error = data.errors.find(e => e.prop === "variant")

    expect(error?.type).toBe("UNKNOWN_ATTRIBUTE")
  })

  it("detects INVALID_VALUE", () => {
    const res = validate("<button data-intent='blue'>Click</button>")
    const data = parse(res)

    const error = data.errors.find(e => e.prop === "data-intent")

    expect(error?.type).toBe("INVALID_VALUE")
  })

  it("detects FORBIDDEN_CLASS", () => {
    const res = validate("<button class='btn'>Click</button>")
    const data = parse(res)

    const error = data.errors.find(e => e.prop === "class")

    expect(error?.type).toBe("FORBIDDEN_CLASS")
  })

  it("detects JS handler", () => {
    const res = validate("<button onclick='alert()'>Click</button>")
    const data = parse(res)

    const error = data.errors.find(e => e.prop === "onclick")

    expect(error?.type).toBe("JS_ON_CSS_COMPONENT")
  })

  it("detects PROP_EXPLOSION", () => {
    const res = validate("<button a='1' b='2' c='3' d='4'>Click</button>")
    const data = parse(res)

    const error = data.errors.find(e => e.type === "PROP_EXPLOSION")

    expect(error).toBeDefined()
  })

  it("detects MISSING_REQUIRED", () => {
    const res = validate("<button></button>")
    const data = parse(res)

    const error = data.errors.find(e => e.type === "MISSING_REQUIRED")

    expect(error).toBeDefined()
  })

  it("detects WRONG_ELEMENT", () => {
    const res = validate("<div>Hello</div>")
    const data = parse(res)

    const error = data.errors.find(e => e.type === "WRONG_ELEMENT")

    expect(error).toBeDefined()
  })

})