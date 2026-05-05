import { manifests } from "../manifests/index.js"
import type { MCPResponse } from "../types.js"

export function listComponents(): MCPResponse {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          components: Object.keys(manifests),
          count: Object.keys(manifests).length,
          tokens_used: 8
        })
      }
    ]
  }
}