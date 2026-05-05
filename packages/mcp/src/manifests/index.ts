import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import path from "path"

export type Manifest = {
  component: string
  version: string
  description: string
  element: string
  emmet: string
  tokens: number

  props: Record<
    string,
    {
      type: string
      values?: string[]
      default?: string
      native?: boolean
      agent_hint?: string
    }
  >

  states?: string[]
  forbidden_props?: string[]
  required_props?: string[]
  required_slots?: string[]
  required_wrapper?: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadManifest(file: string): Manifest {
  return JSON.parse(
    readFileSync(path.join(__dirname, file), "utf-8")
  )
}

export const manifests: Record<string, Manifest> = {
  button: loadManifest("./button.json"),
  input: loadManifest("./input.json"),
  form: loadManifest("./form.json"),
  dialog: loadManifest('./dialog.json'),
  checkbox: loadManifest('./checkbox.json'),
  radio: loadManifest('./radio.json')
}