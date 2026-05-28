import { searchIndex } from './search-index.js'
import { getIntentEntries, scoreEntry } from '../utils/intent-parser.js'
import { getTokenCount } from '../utils/tokenizer.js'
import {
  expandEmmet,
  extractComponents,
  interpolateEmmet
} from '../utils/emmet-helpers.js'

import type { IntentEntry } from '../utils/intent-parser.js'

// ─── Layer 1: api-full.txt INTENTS lookup ───────────────────────────────────

type IntentMatch = {
  name: string
  emmet: string
  score: number
  source: 'intent-table' | 'vector-index'
}

const LAYER1_THRESHOLD = 8 // minimum score to trust an intent-table hit

function searchIntentTable(description: string): IntentMatch | null {
  const entries = getIntentEntries()
  if (entries.length === 0) return null

  const queryWords = tokenise(description)

  // Find all matches meeting the threshold
  const candidates: {
    entry: IntentEntry
    score: number
    density: number
    components: string[]
  }[] = []
  let bestSingle: (IntentMatch & { density: number }) | null = null

  for (const entry of entries) {
    const { score, density } = scoreEntry(entry, queryWords)
    if (score >= LAYER1_THRESHOLD) {
      const components = extractComponents(entry.emmet)
      candidates.push({ entry, score, density, components })

      const isBetter =
        !bestSingle ||
        score > bestSingle.score ||
        (score === bestSingle.score && density > bestSingle.density)
      if (isBetter) {
        bestSingle = {
          name: entry.name,
          emmet: entry.emmet,
          score,
          density,
          source: 'intent-table'
        }
      }
    }
  }

  // If a single template matches with exceptionally high score, trust it directly
  if (bestSingle && bestSingle.score >= 18) {
    return bestSingle
  }

  // Check if the user explicitly requested stitching using conjunction words (and, plus, +, comma)
  const isStitchRequested =
    /\b(and|plus|\+)\b/i.test(description) || description.includes(',')

  // Otherwise, check if we can stitch multiple distinct components together (synthesis)
  if (isStitchRequested && candidates.length >= 2) {
    // Sort candidates by score (descending)
    candidates.sort((a, b) => b.score - a.score || b.density - a.density)

    const selected: typeof candidates = []
    const usedComponents = new Set<string>()

    for (const c of candidates) {
      // Check if this candidate is disjoint from the already selected components
      const hasOverlap = c.components.some((comp) => usedComponents.has(comp))
      if (!hasOverlap) {
        selected.push(c)
        c.components.forEach((comp) => usedComponents.add(comp))
      }
    }

    // If we gathered at least 2 distinct templates, stitch them!
    if (selected.length >= 2) {
      // Re-sort selected in the order they appear in the user description to look natural
      selected.sort((a, b) => {
        const indexA = description
          .toLowerCase()
          .indexOf(tokenise(a.entry.name)[0])
        const indexB = description
          .toLowerCase()
          .indexOf(tokenise(b.entry.name)[0])
        return indexA - indexB
      })

      const combinedEmmet = selected.map((s) => s.entry.emmet).join('+')
      const totalScore = selected.reduce((sum, s) => sum + s.score, 0)

      return {
        name: selected.map((s) => s.entry.name).join(' and '),
        emmet: combinedEmmet,
        score: totalScore,
        source: 'intent-table'
      }
    }
  }

  return bestSingle
}

// ─── Layer 2: vector-index fallback ─────────────────────────────────────────

function searchVectorLayer(description: string): IntentMatch | null {
  const results = searchIndex(description)
  if (results.length === 0) return null
  const top = results[0]
  return {
    name: top.name,
    emmet: top.emmet,
    score: top.score,
    source: 'vector-index'
  }
}

// ─── Public: howToBuild ──────────────────────────────────────────────────────

export async function howToBuild(description: string) {
  let cleanDesc = description.trim()
  if (cleanDesc.startsWith('{') && cleanDesc.endsWith('}')) {
    try {
      const parsed = JSON.parse(cleanDesc)
      if (parsed && typeof parsed.description === 'string') {
        cleanDesc = parsed.description
      } else if (parsed && typeof parsed.text === 'string') {
        cleanDesc = parsed.text
      }
    } catch {
      // Ignore parsing errors, keep original string
    }
  }

  // Layer 1 — fast, deterministic, hand-crafted intent table
  let match = searchIntentTable(cleanDesc)

  // Layer 2 — vector index fallback for novel / unknown queries
  if (!match) {
    match = searchVectorLayer(cleanDesc)
  }

  if (!match) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            emmet: '',
            html: '',
            components_used: [],
            confidence: 0,
            tokens: 0,
            tokens_used: 15,
            source: 'no-match',
            suggestion:
              'Call list_components() to see all available components, or try a different description.'
          })
        }
      ]
    }
  }

  // Apply dynamic interpolation to customize labels, types, and colors on the fly
  const emmet = interpolateEmmet(match.emmet, cleanDesc)
  const components_used = extractComponents(emmet)

  const confidence = Math.min(1, match.score / 40)

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          emmet,
          html: expandEmmet(emmet),
          components_used,
          confidence: Number(confidence.toFixed(2)),
          tokens: getTokenCount(emmet),
          tokens_used: 15,
          source: match.source // tells caller which layer matched
        })
      }
    ]
  }
}
