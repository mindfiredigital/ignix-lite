import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../')

const REQUIRED_TOOLS = [
  'list_components',
  'get_manifest',
  'get_emmet',
  'validate',
  'how_to_build',
  'generate_theme',
  'check_a11y',
  'preview',
  'get_token_summary',
  'create_handoff',
  'apply_handoff'
]

let failures = 0

function pass(msg) {
  console.log(`  ✓  ${msg}`)
}

function fail(msg) {
  console.error(`  ✗  ${msg}`)
  failures++
}

function readJSON(relPath) {
  const abs = resolve(ROOT, relPath)
  if (!existsSync(abs)) {
    fail(`File not found: ${relPath}`)
    return null
  }
  try {
    return JSON.parse(readFileSync(abs, 'utf8'))
  } catch (e) {
    fail(`JSON parse error in ${relPath}: ${e.message}`)
    return null
  }
}

function readText(relPath) {
  const abs = resolve(ROOT, relPath)
  if (!existsSync(abs)) {
    fail(`File not found: ${relPath}`)
    return null
  }
  return readFileSync(abs, 'utf8')
}

console.log('\n Check 1: design-tokens.json ')
const tokens = readJSON('my-skill/assets/design-tokens.json')
if (tokens) {
  if (tokens.color && tokens.typography && tokens.spacing && tokens.shape) {
    pass('Contains color, typography, spacing, shape sections')
  } else {
    fail('Missing one or more required sections (color / typography / spacing / shape)')
  }
  if (tokens['generate_theme_keywords']) {
    pass('Contains generate_theme_keywords')
  } else {
    fail('Missing generate_theme_keywords section')
  }
}

console.log('\n Check 2: intents.json vs manifests/index.ts ')
const intents = readJSON('my-skill/assets/intents.json')
const indexSrc = readText('packages/engine/src/manifests/index.ts')

if (intents && indexSrc) {
  // Extract component names registered in index.ts
  const registered = [...indexSrc.matchAll(/^\s+(\w+):\s+loadManifest/gm)]
    .map((m) => m[1])

  const documented = Object.keys(intents.components ?? {})

  const missing = registered.filter((c) => !documented.includes(c))
  const extra = documented.filter((c) => !registered.includes(c))

  if (missing.length === 0) {
    pass(`All ${registered.length} registered components are documented in intents.json`)
  } else {
    fail(`intents.json missing components: ${missing.join(', ')}`)
  }

  if (extra.length === 0) {
    pass('No extra (phantom) components in intents.json')
  } else {
    fail(`intents.json has extra components not in manifests/index.ts: ${extra.join(', ')}`)
  }
}

console.log('\nCheck 3: api-guide.md completeness ')
const guide = readText('my-skill/references/api-guide.md')
if (guide) {
  for (const tool of REQUIRED_TOOLS) {
    if (guide.includes(tool)) {
      pass(`api-guide.md documents: ${tool}`)
    } else {
      fail(`api-guide.md is missing documentation for: ${tool}`)
    }
  }
}

console.log('\nCheck 4: examples.md completeness ')
const examples = readText('my-skill/references/examples.md')
if (examples) {
  for (const tool of REQUIRED_TOOLS) {
    if (examples.includes(tool)) {
      pass(`examples.md has example for: ${tool}`)
    } else {
      fail(`examples.md is missing example for: ${tool}`)
    }
  }
}

console.log('\nCheck 5: SKILL.md ')
const skill = readText('my-skill/SKILL.md')
if (skill !== null) {
  if (skill.trim().length > 100) {
    pass('SKILL.md exists and is non-empty')
  } else {
    fail('SKILL.md exists but is suspiciously short (< 100 chars)')
  }
}

console.log('\n Check 6: component.html.template')
const template = readText('my-skill/templates/component.html.template')
if (template !== null) {
  if (template.trim().length > 50) {
    pass('component.html.template exists and is non-empty')
  } else {
    fail('component.html.template is too short')
  }
}

console.log('\n Check 7: check-a11y.ts uses RULE_CONFIDENCES map ')
const a11ySrc = readText('packages/engine/src/tools/check-a11y.ts')
if (a11ySrc) {
  if (a11ySrc.includes('RULE_CONFIDENCES')) {
    pass('RULE_CONFIDENCES map is present')
  } else {
    fail('RULE_CONFIDENCES map is missing from check-a11y.ts')
  }
  if (a11ySrc.includes('getConfidenceForRule')) {
    pass('getConfidenceForRule() function is present')
  } else {
    fail('getConfidenceForRule() function missing from check-a11y.ts')
  }
  const oldPattern = /confidence:\s*i\.type\s*===\s*'error'\s*\?\s*0\.98\s*:\s*0\.75/
  if (!oldPattern.test(a11ySrc)) {
    pass('Old hardcoded 0.98/0.75 mapping is absent (correctly replaced)')
  } else {
    fail('Old hardcoded 0.98/0.75 mapping still present in check-a11y.ts')
  }
}

if (failures === 0) {
  console.log('  All checks passed ✓')
} else {
  console.error(`  ${failures} check(s) failed ✗`)
}

process.exit(failures > 0 ? 1 : 0)
