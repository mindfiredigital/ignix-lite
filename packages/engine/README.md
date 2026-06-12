# @mindfiredigital/ignix-lite-engine

> The core rules engine powering [Ignix-Lite](https://github.com/mindfiredigital/ignix-lite) — intent resolution, HTML validation, accessibility auditing, theming, component manifests, and visual preview rendering.

[![npm version](https://img.shields.io/npm/v/@mindfiredigital/ignix-lite-engine)](https://www.npmjs.com/package/@mindfiredigital/ignix-lite-engine)
[![license](https://img.shields.io/npm/l/@mindfiredigital/ignix-lite-engine)](LICENSE)

---

## What is the Engine?

`@mindfiredigital/ignix-lite-engine` is the shared logic layer consumed by both the **CLI** and the **MCP server**. It exposes a set of standalone async functions that you can also use directly in your own tooling, scripts, or Node.js applications.

It requires **no external AI API** — all intelligence is local and deterministic.

---

## Installation

```bash
npm install @mindfiredigital/ignix-lite-engine
```

---

## API Reference

### `howToBuild(description: string)`

Converts a plain English description into the best-fit Ignix-Lite Emmet shorthand and full HTML. Uses a two-layer intent engine — a hand-crafted pattern table (fast, deterministic) with a vector-index fallback for novel descriptions.

```ts
import { howToBuild } from '@mindfiredigital/ignix-lite-engine'

const result = await howToBuild('a danger button that says Delete')
const { emmet, html, components_used, confidence, source } = JSON.parse(result.content[0].text)

// emmet: "button[data-intent=danger]{Delete}"
// html:  "<button data-intent=\"danger\">Delete</button>"
// source: "intent-table"
// confidence: 0.75
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `emmet` | `string` | Emmet shorthand for the generated UI |
| `html` | `string` | Expanded full HTML |
| `components_used` | `string[]` | List of Ignix-Lite component names used |
| `confidence` | `number` | Match confidence score (0–1) |
| `source` | `string` | Which layer matched: `intent-table`, `vector-index`, or `no-match` |
| `tokens` | `number` | Token count of the output |

---

### `validateHtml(html: string)`

Validates HTML markup against Ignix-Lite design rules. Checks for forbidden patterns (`class=`, `color=`, `variant=`), missing required attributes, and incorrect component usage.

```ts
import { validateHtml } from '@mindfiredigital/ignix-lite-engine'

const result = validateHtml('<button class="btn-danger">Delete</button>')

console.log(result.valid)   // false
console.log(result.score)   // 60
console.log(result.errors)
// [{ line: 1, element: 'button', message: 'Use data-intent instead of class', fix: '...' }]
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | `true` if no violations found |
| `score` | `number` | Score out of 100 |
| `errors` | `array` | List of `{ line, element, message, fix }` objects |

---

### `auditA11y(html: string)`

Audits HTML for WCAG 2.2 AA accessibility issues. Checks 15+ rules including missing `alt`, missing `aria-label`, unlabelled inputs, missing `role`, and more.

```ts
import { auditA11y } from '@mindfiredigital/ignix-lite-engine'

const result = auditA11y('<img src="avatar.png">')

console.log(result.score)    // 80
console.log(result.wcag)     // "AA"
console.log(result.issues)
// [{ rule: 'missing-alt', type: 'error', element: '<img>', message: '...', fix: '...' }]
console.log(result.passes)   // ['has-lang', 'button-has-text', ...]
```

---

### `resolveTokens(query: string)` + `buildCss(tokens)`

Resolves a theme from a plain English prompt or hex color and builds a `:root` CSS variable block.

```ts
import { resolveTokens, buildCss } from '@mindfiredigital/ignix-lite-engine'

const tokens = resolveTokens('dark blue modern')
const css = buildCss(tokens)

// css:
// /* Ignix-Lite Custom Theme Variables */
// :root {
//   --ix-primary: #1e40af;
//   --ix-primary-hover: ...
// }
```

---

### `generateTheme(prompt: string)`

Higher-level theme generator that returns a full MCP-compatible response with the CSS string.

```ts
import { generateTheme } from '@mindfiredigital/ignix-lite-engine'

const result = await generateTheme('earthy green tones')
const { css } = JSON.parse(result.content[0].text)
```

---

### `preview(args: PreviewArgs)`

Renders Emmet shorthand or HTML in a headless browser (Playwright) and returns a base64 PNG screenshot.

```ts
import { preview } from '@mindfiredigital/ignix-lite-engine'

const result = await preview({
  input: '<button data-intent="primary">Save</button>',
  options: { width: 400, theme: 'dark' }
})

const { png } = JSON.parse(result.content[0].text)
// png: "data:image/png;base64,..."
```

**`PreviewOptions`:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `400` | Viewport width in pixels |
| `theme` | `'light' \| 'dark'` | system | Emulated color scheme |

---

### `listComponents()`

Returns the list of all 27 available Ignix-Lite components.

```ts
import { listComponents } from '@mindfiredigital/ignix-lite-engine'

const result = await listComponents()
```

---

### `getManifest(name: string)`

Returns the full JSON manifest for a component — props, slots, do/don't rules, and Emmet pattern.

```ts
import { getManifest } from '@mindfiredigital/ignix-lite-engine'

const result = await getManifest('button')
const manifest = JSON.parse(result.content[0].text)
```

---

### `getEmmet(name: string)`

Returns the default Emmet shorthand for a component.

```ts
import { getEmmet } from '@mindfiredigital/ignix-lite-engine'

const result = await getEmmet('tooltip')
```

---

### `createHandoff(rendered_html: string, metadata?: object)` + `applyHandoff(id, changes)`

Multi-agent handoff protocol. Lets multiple AI agents exchange, modify, and patch a shared layout snapshot using lightweight selector diffs.

```ts
import { createHandoff, applyHandoff } from '@mindfiredigital/ignix-lite-engine'

const handoff = await createHandoff('<form>...</form>')
const { handoff_id } = JSON.parse(handoff.content[0].text)

const patched = await applyHandoff(handoff_id, [
  { selector: 'button', attribute: 'data-intent', value: 'danger' }
])
```

---

### `getTokenSummary(context_window?: number)`

Returns token consumption stats for the current session — useful for tracking agent context budget.

```ts
import { getTokenSummary } from '@mindfiredigital/ignix-lite-engine'

const result = await getTokenSummary(128000)
```

---

## All Exports

```ts
export { howToBuild }                          // Intent → UI
export { validateHtml, ValidationError }       // HTML validation
export { auditA11y }                           // Accessibility audit
export { resolveTokens, buildCss, ThemeTokens }// Theme resolution
export { resolveColor }                        // Color utilities
export { generateTheme }                       // Full theme generator
export { preview, PreviewArgs, PreviewOptions }// Headless PNG render
export { createHandoff, applyHandoff }         // Multi-agent handoff
export { listComponents }                      // Component list
export { getManifest }                         // Component manifest
export { getEmmet }                            // Emmet pattern
export { getTokenSummary, recordCall }         // Token tracking
export { manifests }                           // Raw manifest data
```

---

## Architecture

The engine is a **zero-dependency-on-AI** local inference stack:

```
description (text)
      │
      ▼
┌─────────────────────────┐
│  Layer 1: Intent Table  │  ~40 hand-crafted patterns, scored by keyword matching
│  (intent-engine.ts)     │  Fast, deterministic, high confidence
└────────────┬────────────┘
             │ no match / low confidence
             ▼
┌─────────────────────────┐
│  Layer 2: Vector Index  │  Local tf-idf cosine similarity
│  (search-index.ts)      │  Semantic fallback, no API key needed
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  interpolateEmmet()     │  Injects intent, size, shape, quoted labels
│  (emmet-helpers.ts)     │  into the matched Emmet template
└─────────────────────────┘
```

---

## Related Packages

| Package | Description |
|---------|-------------|
| [`@mindfiredigital/ignix-lite-cli`](../cli) | CLI tool — init, build, validate, theme, preview, mcp |
| [`@mindfiredigital/ignix-lite-mcp`](../mcp) | MCP server exposing all engine tools to AI editors |

---

## License

MIT © [Mindfire Digital](https://www.mindfiredigital.com)
