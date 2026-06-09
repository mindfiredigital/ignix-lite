import { parse, type HTMLElement } from 'node-html-parser'
import { expandEmmet } from '../utils/emmet-helpers.js'
import { getTokenCount } from '../utils/tokenizer.js'
import type { MCPResponse } from '../types.js'

export interface HandoffComponent {
  selector: string
  emmet: string
  state: Record<string, string>
  tokens: number
}

export interface HandoffEnvelope {
  schema: 'ignix-lite-handoff'
  version: '1.0'
  id: string
  timestamp: number
  html: string
  components: HandoffComponent[]
  total_tokens: number
  metadata?: Record<string, unknown>
}

const MAX_HANDOFFS = 100
const handoffs = new Map<string, HandoffEnvelope>()

function saveHandoff(id: string, envelope: HandoffEnvelope): void {
  if (handoffs.size >= MAX_HANDOFFS) {
    const oldestKey = handoffs.keys().next().value
    if (oldestKey !== undefined) {
      handoffs.delete(oldestKey)
    }
  }
  handoffs.set(id, envelope)
}

function generateHandoffId(): string {
  return 'hndff_' + Math.random().toString(36).substring(2, 15)
}

function extractState(element: HTMLElement): Record<string, string> {
  const state: Record<string, string> = {}
  const attrs = ['data-intent', 'disabled', 'checked', 'open', 'aria-busy', 'aria-invalid', 'aria-selected', 'aria-expanded']
  for (const attr of attrs) {
    const val = element.getAttribute(attr)
    if (val !== undefined && val !== null) {
      state[attr] = val === '' ? 'true' : val
    }
  }
  return state
}

export function createHandoff(args: { rendered_html: string, metadata?: Record<string, unknown> }): MCPResponse {
  const { rendered_html, metadata } = args
  const root = parse(rendered_html)

  const id = generateHandoffId()
  const timestamp = Date.now()
  const components: HandoffComponent[] = []

  const componentTags = [
    'button', 'input', 'textarea', 'select', 'aside', 'mark', 'article',
    'dialog', 'details', 'progress', 'meter', 'nav', 'hr', 'pre', 'table',
    'ix-tabs', 'ix-dropdown', 'ix-combobox', 'ix-tooltip', 'ix-toast'
  ]

  const elements = root.querySelectorAll('*')
  for (const el of elements) {
    const tag = el.tagName.toLowerCase()
    if (componentTags.includes(tag) || el.getAttribute('data-intent')) {
      const elementId = el.getAttribute('id')
      const selector = elementId ? `#${elementId}` : tag

      const outerHtml = el.outerHTML
      const tokens = getTokenCount(outerHtml)
      const state = extractState(el)

      components.push({
        selector,
        emmet: outerHtml,
        state,
        tokens
      })
    }
  }

  const envelope: HandoffEnvelope = {
    schema: 'ignix-lite-handoff',
    version: '1.0',
    id,
    timestamp,
    html: rendered_html,
    components,
    total_tokens: getTokenCount(rendered_html),
    metadata
  }

  saveHandoff(id, envelope)

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          handoff_id: id,
          snapshot: {
            schema: envelope.schema,
            version: envelope.version,
            id: envelope.id,
            timestamp: envelope.timestamp,
            components: envelope.components.map(c => ({
              selector: c.selector,
              emmet: c.emmet,
              state: c.state,
              tokens: c.tokens
            })),
            total_tokens: envelope.total_tokens,
            metadata: envelope.metadata
          },
          tokens_used: 10
        })
      }
    ]
  }
}

export interface HandoffChange {
  selector: string
  action: 'update' | 'add' | 'remove'
  emmet?: string
  html?: string
}

export function applyHandoff(args: { handoff_id: string, changes: HandoffChange[] }): MCPResponse {
  const { handoff_id, changes } = args
  const envelope = handoffs.get(handoff_id)

  if (!envelope) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: `Handoff snapshot not found: ${handoff_id}`,
            tokens_used: 5
          })
        }
      ]
    }
  }

  const root = parse(envelope.html)
  let diffTokens = 0
  const failedSelectors: string[] = []
  const errors: string[] = []

  const sortedChanges = [...changes].sort((a, b) => {
    if (a.action === 'remove' && b.action !== 'remove') return 1
    if (a.action !== 'remove' && b.action === 'remove') return -1
    return 0
  })

  for (const change of sortedChanges) {
    const target = root.querySelector(change.selector)
    if (!target) {
      failedSelectors.push(change.selector)
      continue
    }

    try {
      const changeContent = change.html || (change.emmet ? expandEmmet(change.emmet) : '')
      diffTokens += getTokenCount(changeContent || change.selector)

      if (change.action === 'update') {
        const newNode = parse(changeContent)
        target.replaceWith(newNode)
      } else if (change.action === 'add') {
        const newNode = parse(changeContent)
        target.appendChild(newNode)
      } else if (change.action === 'remove') {
        target.remove()
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      errors.push(`Failed to apply change on selector "${change.selector}": ${message}`)
    }
  }

  const updatedHtml = root.toString()
  const fullTokens = getTokenCount(updatedHtml)
  const savingsPct = fullTokens > 0 ? Math.round((1 - diffTokens / fullTokens) * 100) : 0

  envelope.html = updatedHtml
  envelope.total_tokens = fullTokens
  saveHandoff(handoff_id, envelope)

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          updated_html: updatedHtml,
          diff_tokens: diffTokens,
          full_tokens: fullTokens,
          savings_pct: Math.max(0, savingsPct),
          failed_selectors: failedSelectors.length > 0 ? failedSelectors : undefined,
          errors: errors.length > 0 ? errors : undefined,
          tokens_used: 15
        })
      }
    ]
  }
}
