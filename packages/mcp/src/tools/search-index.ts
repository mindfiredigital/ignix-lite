import { readFileSync } from 'fs'
import { embedText } from './embedder.js'
import { cosineSimilarity } from './cosine.js'

type IndexItem = {
  name: string
  emmet: string
  searchable: string
  embedding: number[]
}

const index: IndexItem[] = JSON.parse(
  readFileSync('dist/vector-index.json', 'utf8')
)
export function searchIndex(description: string) {
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
