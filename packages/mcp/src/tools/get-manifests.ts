import { z } from "zod"
import { manifests } from "../manifests/index.js"
import type { MCPResponse } from "../types.js"

const schema = z.object({
  name: z.string()
})

export function getManifest(args: unknown): MCPResponse {
  const parsed = schema.safeParse(args)

  if (!parsed.success) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: "Invalid input",
            suggestion: "Expected { name: string }",
            tokens_used: 2
          })
        }
      ]
    }
  }

  const { name } = parsed.data

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          manifests[name] || {
            error: `Unknown component: ${name}`,
            suggestion: "Call list_components() first"
          }
        )
      }
    ]
  }
}