import type { MCPResponse } from '../types.js'

export type CallRecord = {
  tool: string
  tokens_used: number
  timestamp: number
}

let totalTokensUsed = 0
const calls: CallRecord[] = []
const sessionId = Math.random().toString(36).substring(2, 15)

const MAX_CALL_HISTORY = 1000

export function recordCall(toolName: string, tokensUsed: number): void {
  if (calls.length >= MAX_CALL_HISTORY) {
    calls.shift()
  }
  calls.push({
    tool: toolName,
    tokens_used: tokensUsed,
    timestamp: Date.now()
  })
  totalTokensUsed += tokensUsed
}

export function getTokenSummary(
  args: { context_window?: number } = {}
): MCPResponse {
  const contextWindow = args.context_window || 128000
  const pct = Number(((totalTokensUsed / contextWindow) * 100).toFixed(4))

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          session_id: sessionId,
          calls,
          total_tokens_used: totalTokensUsed,
          estimated_context_pct: pct,
          tokens_used: 20
        })
      }
    ]
  }
}
