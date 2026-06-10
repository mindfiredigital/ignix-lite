import { z } from 'zod'
import type { MCPResponse } from '../types.js'
import { resolveTokens, buildCss } from './theme-tokens.js'

const schema = z.object({ prompt: z.string().min(1) })

export function generateTheme(args: unknown): MCPResponse {
  const parsed = schema.safeParse(args)

  if (!parsed.success) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: 'Invalid input',
            suggestion: 'Expected { prompt: string }',
            tokens_used: 2
          })
        }
      ]
    }
  }

  const { prompt } = parsed.data
  const tokens = resolveTokens(prompt.toLowerCase().trim())

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          prompt,
          primary: tokens.resolvedPrimary,
          isDark: tokens.isDark,
          css: buildCss(tokens),
          tokens_used: 10
        })
      }
    ]
  }
}
