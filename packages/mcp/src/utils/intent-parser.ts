import { readFileSync } from 'fs'
import path from 'path'
import { tokenise, isSimilar } from './intent-helpers.js'

export type IntentEntry = {
  name: string // the caveman phrase (first line)
  phrases: string[] // all tokenised words from the phrase
  emmet: string // the emmet pattern from the "- ..." line
  category: string // section header e.g. "DESTROY / DANGER"
}

/**
 * Parse the INTENTS block out of api-full.txt.
 *
 * Format expected:
 *   --- CATEGORY NAME ---
 *   caveman phrase description
 *   - emmet[pattern]{here}
 *   (blank line)
 *   ...
 */
function parseIntents(raw: string): IntentEntry[] {
  const entries: IntentEntry[] = []

  // Find where the INTENTS block starts
  const intentStart = raw.indexOf('INTENTS:')
  if (intentStart === -1) return entries

  const block = raw.slice(intentStart)
  const lines = block.split(/\r?\n/)

  let currentCategory = 'GENERAL'
  let pendingPhrase: string | null = null

  for (const raw_line of lines) {
    const line = raw_line.trim()

    // Category header: --- DESTROY / DANGER ---
    if (line.startsWith('---') && line.endsWith('---')) {
      currentCategory = line
        .replace(/^-+\s*/, '')
        .replace(/\s*-+$/, '')
        .trim()
      pendingPhrase = null
      continue
    }

    // Skip meta comment line [caveman prompt → emmet...]
    if (line.startsWith('[') && line.endsWith(']')) continue

    // Skip NEVER DO section (starts with "never use")
    if (line.startsWith('never ')) continue

    // Skip blank lines and "→" alias lines (these are in NEVER DO)
    if (line === '' || line.startsWith('→')) continue

    // Emmet line: starts with "- "
    if (line.startsWith('- ') && pendingPhrase !== null) {
      const emmet = line.slice(2).trim()
      entries.push({
        name: pendingPhrase,
        phrases: tokenise(pendingPhrase),
        emmet,
        category: currentCategory
      })
      pendingPhrase = null
      continue
    }

    // Anything else is a caveman phrase (intent description)
    if (!line.startsWith('-')) {
      pendingPhrase = line
    }
  }

  return entries
}

// ---- Resolve the api-full.txt path relative to this package root ----
function loadIntents(): IntentEntry[] {
  try {
    const txtPath = path.resolve(process.cwd(), '../../api-full.txt')
    const raw = readFileSync(txtPath, 'utf8')
    return parseIntents(raw)
  } catch {
    // Fallback: try relative to dist (when running built output)
    try {
      const txtPath = path.resolve(process.cwd(), '../../../api-full.txt')
      const raw = readFileSync(txtPath, 'utf8')
      return parseIntents(raw)
    } catch {
      return []
    }
  }
}

// Singleton - parsed once at server startup, stays in-memory (DC-13)
let _cache: IntentEntry[] | null = null

export function getIntentEntries(): IntentEntry[] {
  if (!_cache) {
    _cache = loadIntents()
  }
  return _cache
}

export type ScoreResult = {
  score: number
  density: number
}

/**
 * Score a single IntentEntry against the query, tolerating minor typos.
 * Returns { score, density } for tie-breaking.
 */
export function scoreEntry(
  entry: IntentEntry,
  queryWords: string[]
): ScoreResult {
  let score = 0
  const entryWords = new Set(entry.phrases)
  let matchedCount = 0

  for (const qw of queryWords) {
    let matched = false
    // 1. Exact match (+10)
    if (entryWords.has(qw)) {
      score += 10
      matched = true
    } else {
      // 2. Fuzzy spelling similarity match (+8)
      for (const ew of entryWords) {
        if (isSimilar(qw, ew)) {
          score += 8
          matched = true
          break
        }
      }
      // 3. Substring match fallback (+4)
      if (!matched) {
        for (const ew of entryWords) {
          if (ew.includes(qw) || qw.includes(ew)) {
            score += 4
            matched = true
            break
          }
        }
      }
    }
    if (matched) {
      matchedCount++
    }
  }

  // Bonus: category keyword overlap (supports fuzzy spelling matches)
  const catWords = tokenise(entry.category)
  for (const qw of queryWords) {
    if (catWords.includes(qw)) {
      score += 3
    } else {
      for (const cw of catWords) {
        if (isSimilar(qw, cw)) {
          score += 2
          break
        }
      }
    }
  }

  // Density = portion of the entry's phrases that were matched by the query
  const density =
    entry.phrases.length > 0 ? matchedCount / entry.phrases.length : 0

  return { score, density }
}
