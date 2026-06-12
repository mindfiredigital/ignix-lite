import { z } from 'zod'
import { manifests } from '../manifests/index.js'
import type { MCPResponse } from '../types.js'

const schema = z.object({
  name: z.string()
})

export function getManifest(args: unknown): MCPResponse {
  const parsed = schema.safeParse(args)

  if (!parsed.success) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: 'Invalid input',
            suggestion: 'Expected { name: string }',
            tokens_used: 2
          })
        }
      ]
    }
  }

  const { name } = parsed.data

  const manifest = manifests[name]

  if (!manifest) {
    return {
      content: [
        {
          type: 'text',

          text: JSON.stringify({
            error: `Unknown component: ${name}`,
            suggestion: 'Call list_components() first',
            tokens_used: 2
          })
        }
      ]
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(manifest)
      }
    ]
  }
}
