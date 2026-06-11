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
  const parsedTokens = Number(tokensUsed)
  const validTokens =
    isNaN(parsedTokens) || parsedTokens < 0 || !isFinite(parsedTokens)
      ? 0
      : parsedTokens

  if (calls.length >= MAX_CALL_HISTORY) {
    calls.shift()
  }
  calls.push({
    tool: toolName,
    tokens_used: validTokens,
    timestamp: Date.now()
  })
  totalTokensUsed += validTokens
}

export function getTokenSummary(
  args: { context_window?: number } = {}
): MCPResponse {
  const contextWindowInput = args.context_window || 128000
  const parsedWindow = Number(contextWindowInput)
  const contextWindow =
    isNaN(parsedWindow) || parsedWindow <= 0 || !isFinite(parsedWindow)
      ? 128000
      : parsedWindow

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
