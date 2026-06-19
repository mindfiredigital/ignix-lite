import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { tokenise, isSimilar } from './intent-helpers.js'

export type IntentEntry = {
  name: string
  phrases: string[]
  emmet: string
  category: string
}


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

function loadIntents(): IntentEntry[] {
  try {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))

    // Try relative paths from current file structure (packages/mcp/src/utils/ or dist/utils/)
    const pathDist = path.resolve(currentDir, './api-full.txt')
    const path1 = path.resolve(currentDir, '../../../api-full.txt')
    const path2 = path.resolve(currentDir, '../../api-full.txt')
    const path3 = path.resolve(currentDir, '../../../../api-full.txt')

    let txtPath = pathDist
    if (existsSync(pathDist)) {
      txtPath = pathDist
    } else if (existsSync(path1)) {
      txtPath = path1
    } else if (existsSync(path2)) {
      txtPath = path2
    } else if (existsSync(path3)) {
      txtPath = path3
    } else {
      txtPath = path.resolve(process.cwd(), '../../api-full.txt')
    }

    const raw = readFileSync(txtPath, 'utf8')
    return parseIntents(raw)
  } catch {
    return []
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

// Score a single IntentEntry against the query, tolerating minor typos. eturns { score, density } for tie-breaking.

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

  // Simple synonym boosting for structural elements
  if (queryWords.some(w => ['section', 'card', 'box', 'container'].includes(w)) && (entry.emmet.includes('section') || entry.emmet.includes('article'))) {
    score += 10
  }
  if (queryWords.some(w => ['alert', 'banner', 'notification', 'warning'].includes(w)) && entry.emmet.includes('aside')) {
    score += 10
  }
  if (queryWords.some(w => ['dialog', 'modal', 'popup', 'confirm', 'window'].includes(w)) && entry.emmet.includes('dialog')) {
    score += 10
  }
  if (queryWords.some(w => ['tooltip', 'hint', 'hover', 'tip'].includes(w)) && entry.emmet.includes('tooltip')) {
    score += 10
  }

  // Density = portion of the entry's phrases that were matched by the query
  const density =
    entry.phrases.length > 0 ? matchedCount / entry.phrases.length : 0

  return { score, density }
}
