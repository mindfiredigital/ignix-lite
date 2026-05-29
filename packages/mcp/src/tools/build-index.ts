import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { embedText } from './embedder.js'

type Example = {
  label?: string
  emmet?: string
  html?: string
}

interface Manifest {
  component?: string
  description?: string
  element?: string
  emmet?: string
  states?: string[]
  do?: string[]
  dont?: string[]
  examples?: Example[]
}

const files = readdirSync('src/manifests')

const index = files
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const manifest: Manifest = JSON.parse(
      readFileSync(`src/manifests/${file}`, 'utf8')
    )

    const searchable = [
      manifest.component ?? '',
      manifest.description ?? '',
      manifest.element ?? '',
      manifest.emmet ?? '',

      ...(manifest.states ?? []),
      ...(manifest.do ?? []),
      ...(manifest.dont ?? []),
      ...(manifest.examples ?? []).flatMap((x: Example) => [
        x.label ?? '',
        x.emmet ?? '',
        x.html ?? ''
      ])
    ].join(' ')

    return {
      name: manifest.component,
      emmet: manifest.emmet,
      searchable,
      embedding: embedText(searchable)
    }
  })

writeFileSync('dist/vector-index.json', JSON.stringify(index, null, 2))
console.log('Vector index built')
