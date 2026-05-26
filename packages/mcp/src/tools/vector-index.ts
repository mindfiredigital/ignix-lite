import { manifests } from '../manifests/index.js'

import type { Manifest } from '../types.js'

type SearchResult = {
  name: string
  manifest: Manifest
  score: number
}

type IndexEntry = {
  name: string
  text: string
  manifest: Manifest
}

function buildKeywords(manifest: Manifest): string {
  return [
    manifest.component ?? '',
    manifest.description ?? '',
    manifest.element ?? '',
    manifest.emmet ?? '',

    ...(manifest.states ?? []),
    ...(manifest.do ?? []),
    ...(manifest.dont ?? []),
    ...(manifest.examples ?? []).flatMap((example) => [
      example.label ?? '',
      example.emmet ?? '',
      example.html ?? ''
    ])
  ]
    .join(' ')
    .toLowerCase()
}

export class VectorIndex {
  private items: IndexEntry[] = []

  constructor() {
    Object.entries(manifests).forEach(([name, manifest]) => {
      this.items.push({ name, text: buildKeywords(manifest), manifest })
    })
  }

  query(input: string, options = { topK: 3 }): SearchResult[] {
    const words = input
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 1)
    const scored = this.items.map((item) => {
      let score = 0
      const component = (item.manifest.component ?? '').toLowerCase()
      const description = (item.manifest.description ?? '').toLowerCase()
      words.forEach((word) => {
        if (component === word) {
          score += 20
        } else if (component.includes(word)) {
          score += 10
        }
        if (description.includes(word)) {
          score += 8
        }
        if (item.text.includes(word)) {
          score += 3
        }
      })
      return {
        name: item.name,
        manifest: item.manifest,
        score
      }
    })
    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, options.topK)
  }
}
