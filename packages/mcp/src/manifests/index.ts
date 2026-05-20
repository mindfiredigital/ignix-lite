import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import type { Manifest } from '../types.js'
import { getTokenCount } from '../utils/tokenizer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadManifest(file: string): Manifest {
  const manifest = JSON.parse(
    readFileSync(
      path.join(__dirname, file),
      'utf-8'
    )
  ) as Manifest

  manifest.tokens = getTokenCount(manifest.emmet)

  console.log(
    '[TOKEN]',
    manifest.component,
    '=',
    manifest.tokens,
    '|',
    manifest.emmet
  )

  return manifest
}

export const manifests: Record<string, Manifest> = {

  accordion: loadManifest('./accordion.json'),
  alert: loadManifest('./alert.json'),
  avatar: loadManifest('./avatar.json'),
  badge: loadManifest('./badge.json'),
  button: loadManifest('./button.json'),
  card: loadManifest('./card.json'),
  checkbox: loadManifest('./checkbox.json'),
  codeblock: loadManifest('./codeblock.json'),
  combobox: loadManifest('./combobox.json'),
  dialog: loadManifest('./dialog.json'),
  divider: loadManifest('./divider.json'),
  dropdown: loadManifest('./dropdown.json'),
  form: loadManifest('./form.json'),
  grid: loadManifest('./grid.json'),
  input: loadManifest('./input.json'),
  meter: loadManifest('./meter.json'),
  navigation: loadManifest('./navigation.json'),
  progress: loadManifest('./progress.json'),
  radio: loadManifest('./radio.json'),
  select: loadManifest('./select.json'),
  skeleton: loadManifest('./skeleton.json'),
  tab: loadManifest('./tab.json'),
  table: loadManifest('./table.json'),
  textarea: loadManifest('./textarea.json'),
  toast: loadManifest('./toast.json'),
  tooltip: loadManifest('./tooltip.json')
  
}
