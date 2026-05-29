import { readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { embedText } from './embedder.js'

type Example = {
  label?: string
  emmet?: string
  html?: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const manifestsDir = path.resolve(__dirname, '../manifests')
const files = readdirSync(manifestsDir)

const index = files
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    let manifest: any
    try {
      manifest = JSON.parse(readFileSync(path.join(manifestsDir, file), 'utf8'))
    } catch (err) {
      console.error(`Error parsing JSON manifest for ${file}:`, err)
      throw err
    }

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

const outputPath = path.resolve(__dirname, '../../dist/vector-index.json')
writeFileSync(outputPath, JSON.stringify(index, null, 2))
console.log('Vector index built')
