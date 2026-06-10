import path from 'path'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { embedText } from './embedder.js'
import { cosineSimilarity } from '../utils/cosine.js'

type IndexItem = {
  name: string
  emmet: string
  searchable: string
  embedding: number[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let _index: IndexItem[] | null = null

function loadIndex(): IndexItem[] {
  if (_index) return _index
  const indexPath = path.resolve(__dirname, '../../dist/vector-index.json')
  if (!existsSync(indexPath)) {
    console.warn(
      `[search-index] dist/vector-index.json not found at: ${indexPath} - run pnpm build:index`
    )
    _index = []
    return _index
  }
  try {
    _index = JSON.parse(readFileSync(indexPath, 'utf8'))
  } catch (err) {
    console.error(`[search-index] Failed to load index from ${indexPath}:`, err)
    _index = []
  }
  return _index!
}

export function searchIndex(description: string) {
  const index = loadIndex()
  const queryEmbedding = embedText(description)

  const words = description.toLowerCase().split(/\s+/)
  const ranked = index
    .map((item) => {
      const similarity = cosineSimilarity(queryEmbedding, item.embedding)
      let boost = 0
      const searchable = item.searchable.toLowerCase()

      words.forEach((word) => {
        if (item.name.toLowerCase() === word) {
          boost += 2
        } else if (item.name.toLowerCase().includes(word)) {
          boost += 1
        }
        if (searchable.includes(word)) {
          boost += 0.3
        }
      })
      return {
        ...item,
        score: similarity + boost
      }
    })
    .sort((a, b) => b.score - a.score)
  return ranked.slice(0, 3)
}
