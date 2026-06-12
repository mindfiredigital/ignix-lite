import { manifests } from '../manifests/index.js'

import type { MCPResponse } from '../types.js'

export function listComponents(): MCPResponse {
  const components = Object.keys(manifests).sort()

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          components,
          count: components.length,
          tokens_used: components.length
        })
      }
    ]
  }
}
