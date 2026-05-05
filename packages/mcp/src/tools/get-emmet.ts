import { z } from "zod"
import { manifests } from "../manifests/index.js"
import type { MCPResponse } from "../types.js"

const schema = z.object({
  name: z.string()
})

export function getEmmet(args: unknown): MCPResponse {
  const parsed = schema.safeParse(args)

  if (!parsed.success) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: "Invalid input",
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
        text: JSON.stringify({
          emmet: manifests[name]?.emmet ?? null,
          tokens: manifests[name]?.tokens ?? null,
          tokens_used: 3
        })
      }
    ]
  }
}