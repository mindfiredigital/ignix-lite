import { readFileSync, existsSync } from 'fs'
import { embedText } from './embedder.js'
import { cosineSimilarity } from '../utils/cosine.js'

type IndexItem = {
  name: string
  emmet: string
  searchable: string
  embedding: number[]
}

let _index: IndexItem[] | null = null

function loadIndex(): IndexItem[] {
  if (_index) return _index
  const path = 'dist/vector-index.json'
  if (!existsSync(path)) {
    console.warn(
      '[search-index] dist/vector-index.json not found - run pnpm build:index'
    )
    _index = []
    return _index
  }
  _index = JSON.parse(readFileSync(path, 'utf8'))
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
