---
name: ignix-lite
version: 2.0.0
description: >
  Ignix-Lite is a native HTML + ~8KB CSS design system. Zero class names.
  Zero JS (95%). Styled exclusively via data-intent attributes and native
  HTML state attributes. Works with any framework or no framework at all.
author: Mindfire Digital
tags: [html, css, design-system, accessible, zero-js, mcp]
mcp_server: npx ignix-lite mcp
---

# Ignix-Lite v2 — AI Skill

> Read this file fully before generating any Ignix-Lite markup.

---

## 1. What Is Ignix-Lite?

Ignix-Lite is a **native HTML + ~8 KB CSS** design system.

- **No class names.** Styling is driven entirely by `data-intent` and native HTML attributes.
- **No JS required (95%).** Five custom elements and one customized built-in use minimal JS. Everything else is pure CSS.
- **Semantic-first.** Every component maps to a native HTML element.
- **Accessible by default.** ARIA roles, states, and keyboard navigation are built-in.
- **MCP-powered.** 11 MCP tools let AI agents generate, validate, and theme Ignix-Lite UI.

---

## 2. The ONE Rule

```
Style → data-intent="primary|danger|warning|success|neutral|ghost"
State → native HTML: disabled / aria-busy / aria-invalid / open / checked
```

### Never use — produces broken or unstyled output

| Wrong | Correct |
|-------|---------|
| `class="btn-primary"` | `data-intent="primary"` |
| `variant="danger"` | `data-intent="danger"` |
| `color="red"` | `data-intent="danger"` |
| `isDisabled={true}` | `disabled` |
| `isLoading={true}` | `aria-busy="true"` |
| `style=` for theming | `generate_theme` MCP tool |
| `onClick=` on a CSS component | no handler needed |
| `size="lg"` | `data-size="lg"` (only on `img` and `label`) |
| more than 4 attributes on one element | split into child elements |

---

## 3. Component Elements Reference

### Native HTML Elements (27 components — no custom tag needed)

| Component | HTML Element | `data-intent` Values | Key Attributes |
|-----------|-------------|----------------------|----------------|
| Alert | `<aside>` | `info` `success` `warning` `danger` | — |
| Accordion | `<details>` | — | `open` |
| Badge | `<mark>` | `primary` `success` `warning` `danger` `neutral` | — |
| Badge (status chip) | `<span role="status">` | `primary` `success` `warning` `danger` `neutral` | — |
| Breadcrumb | `<nav aria-label="Breadcrumb"> > ol > li > a` | — | `aria-current`, `data-style` |
| Button | `<button>` | `primary` `danger` `warning` `success` `neutral` `ghost` | `type`, `disabled`, `aria-busy` |
| Card | `<article>` | — | slot attributes |
| Checkbox | `<input type="checkbox">` inside `<label>` | — | `disabled`, `required`, `checked` |
| Codeblock | `<pre><code>` | — | `data-lang` |
| Dialog | `<dialog>` | `danger` `warning` `info` | `open`, `id` |
| Divider | `<hr>` | — | `data-orientation=vertical` |
| Form | `<form>` | — | `id`, `aria-busy` |
| Grid | `<section data-grid>` | — | `data-grid`, `data-gap`, `data-align`, `data-justify`, `data-dense` |
| Input | `<input>` inside `<label>` | `primary` `danger` `warning` `success` `neutral` | `type`, `required`, `disabled`, `aria-invalid` |
| Meter | `<meter>` | — | `value`, `min`, `max`, `low`, `high`, `optimum` |
| Navigation | `<nav>` | — | `aria-label`, `aria-current` |
| Progress | `<progress>` | — | `value`, `max` |
| Radio | `<input type="radio">` inside `<label>` | — | `disabled`, `required`, `checked` |
| Select | `<select>` inside `<label>` | `primary` `danger` `warning` `success` `neutral` | `multiple`, `disabled`, `required` |
| Skeleton | `<span aria-busy="true">` | — | `data-shape=text\|rect\|circle`, `data-lines` |
| Table (static) | `<table>` | — | — |
| Table (sortable) | `<table is="ix-table">` | — | `data-sortable` on `<th>`, `aria-sort` on `<th>` |
| Textarea | `<textarea>` inside `<label>` | `primary` `danger` `warning` `success` `neutral` | `rows`, `disabled`, `required`, `aria-invalid` |

### Web Component Elements (require JS — use these exact tags)

| Component | Element | Purpose | Requires JS For |
|-----------|---------|---------|-----------------|
| Tabs | `<ix-tabs>` | Tabbed panels | Panel switching, keyboard nav |
| Dropdown | `<ix-dropdown>` | Menu / select trigger | `.open()` `.close()` `.toggle()` |
| Combobox | `<ix-combobox>` | Search-as-you-type select | Search, multi-select chips |
| Toast | `<ix-toast>` | Transient notifications | `.show(options)` |
| Tooltip | `<ix-tooltip>` | Hover tooltip | ARIA wiring, `aria-describedby` |

Table's sortable behavior (`table[is="ix-table"]`) is a customized built-in. It renders as a plain table without JS; clicking sortable headers requires the JS registration.

---

## 4. State Attributes

| UI State | Attribute |
|----------|-----------|
| Disabled | `disabled` |
| Loading | `aria-busy="true"` |
| Invalid / error | `aria-invalid="true"` |
| Accordion open | `open` on `<details>` |
| Tab active | `aria-selected="true"` on `[slot=tab]` |
| Panel visible | remove `hidden` from `[slot=panel]` |
| Dropdown open | `aria-expanded="true"` |
| Sort ascending | `aria-sort="ascending"` on `<th>` |
| Sort descending | `aria-sort="descending"` on `<th>` |
| Breadcrumb current | `aria-current="page"` on `<a>` |

---

## 5. Article (Card) Slot System

```html
<article>
  <img slot="avatar" src="photo.jpg" alt="User photo" data-size="md">
  <h2 slot="title">Card Title</h2>
  <small slot="meta">Subtitle or date</small>
  <p slot="body">Main content goes here.</p>
  <button slot="action" data-intent="primary">CTA</button>
  <small slot="footer">Footer note</small>
</article>
```

Valid slots: `avatar` · `title` · `meta` · `body` · `action` · `footer`

---

## 6. Grid Layout

Grid container is `<section data-grid="N">`. Children span with `data-col` and `data-row`.

| Attribute | Values | Notes |
|-----------|--------|-------|
| `data-grid` | `1` `2` `3` `4` `5` `6` | Fixed column count |
| `data-grid` | `auto` | `auto-fit` — columns collapse to fill |
| `data-grid` | `fill` | `auto-fill` — columns always 220px min |
| `data-gap` | `xs` `sm` `md` `lg` `xl` | Spacing between items |
| `data-align` | `start` `center` `end` `stretch` `baseline` | `align-items` |
| `data-justify` | `start` `center` `end` `stretch` | `justify-items` |
| `data-dense` | *(present)* | Dense grid auto-flow |
| `data-col` | `1`–`6` `full` | Column span on a child item |
| `data-row` | `2` `3` | Row span on a child item |

```html
<section data-grid="3" data-gap="md">
  <article>One</article>
  <article data-col="2">Spans two columns</article>
  <article data-col="full">Full width</article>
</section>
```

---

## 7. Sortable Table

`data-sortable` belongs on `<th>` header cells, not on `<table>`. Wrap in `<section>` for responsive horizontal scroll.

```html
<section>
  <table is="ix-table">
    <thead>
      <tr>
        <th data-sortable aria-sort="ascending">Name</th>
        <th data-sortable aria-sort="none">Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice</td>
        <td><mark data-intent="success">Active</mark></td>
        <td><button data-intent="danger">Remove</button></td>
      </tr>
    </tbody>
  </table>
</section>
```

---

## 8. Web Component Patterns

### ix-tabs
```html
<ix-tabs data-variant="underline">
  <button slot="tab" aria-selected="true">Overview</button>
  <button slot="tab">Details</button>
  <section slot="panel">Overview content</section>
  <section slot="panel" hidden>Details content</section>
</ix-tabs>
```
`data-variant`: `underline` · `pill` · `gradient`

### ix-dropdown
```html
<ix-dropdown data-intent="neutral">
  <button slot="trigger" aria-haspopup="menu" aria-expanded="false">Options</button>
  <ul slot="menu">
    <li><button>Edit</button></li>
    <li><button>Delete</button></li>
  </ul>
</ix-dropdown>
```
JS methods: `.open()` · `.close()` · `.toggle()`

### ix-combobox
```html
<ix-combobox>
  <label>
    <span data-chips></span>
    <input placeholder="Search...">
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Option A</li>
    <li>Option B</li>
  </ul>
</ix-combobox>
```
`data-intent`: `primary` , `success` , `warning` , `danger` , `gradient` (styles selected chips and list item highlights)


### ix-tooltip
```html
<ix-tooltip content="Helpful text" data-position="top">
  <button data-intent="neutral">Hover me</button>
</ix-tooltip>
```
`content` attribute is **required**. `data-position`: `top` · `bottom` · `left` · `right`
`data-intent`: `success` · `danger` · `warning`

### ix-toast
```html
<ix-toast id="myToast" data-position="top-right"></ix-toast>
```
```js
document.querySelector('#myToast').show({
  title: 'Done!',
  message: 'Your changes were saved.',
  intent: 'success',     // primary | danger | warning | success | neutral | gradient
  duration: 3000,        // ms — omit for persistent
  variant: 'fade',       // fade | slide | pop | action
  actionText: 'Undo'     // only used when variant='action'
})
```
`data-position`: `top-left` · `top-right` · `bottom-left` · `bottom-right` · `bottom-center`

---

## 9. Breadcrumb Styles

```html
<nav aria-label="Breadcrumb" data-style="slash">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/settings">Settings</a></li>
    <li><a href="/settings/profile" aria-current="page">Profile</a></li>
  </ol>
</nav>
```

| `data-style` | Separator |
|---|---|
| *(omit)* or `chevron` | `>` angled chevron |
| `slash` | `/` |
| `guillemet` | `›` |
| `arrow` | solid triangle |
| `thread` | dotted line |

Also accepts `data-intent`: `success` · `warning` · `danger` · `gradient` (colours the active link).

---

## 10. Theme & Design Tokens

All tokens are CSS custom properties on `:root`, prefixed `--ix-`.

```css
--ix-primary          /* brand colour */
--ix-danger           /* #ef4444 */
--ix-warning          /* #f59e0b */
--ix-success          /* #22c55e */
--ix-neutral          /* muted grey */
--ix-surface          /* page background */
--ix-surface-raised   /* card / modal background */
--ix-text             /* primary text */
--ix-text-muted       /* secondary text */
--ix-border           /* border colour */
--ix-radius           /* border radius */
--ix-radius-lg        /* larger radius */
--ix-focus            /* focus ring style */
--ix-font             /* font stack */
--ix-font-mono        /* monospace stack */
```

Dark mode is automatic via `prefers-color-scheme: dark`. To force dark mode, use `generate_theme` with a dark keyword.

Full token catalogue: [`assets/design-tokens.json`](assets/design-tokens.json)

---

## 11. MCP Tools (11)

Use tools in this order of preference:

```
Describe UI in plain English     → how_to_build({ description })
Need full component props/slots  → get_manifest({ name })
Just the Emmet snippet           → get_emmet({ name })
List all components              → list_components()
Validate generated HTML          → validate({ html })
WCAG 2.2 accessibility check     → check_a11y({ html })
Generate a colour theme          → generate_theme({ prompt })
Headless visual preview          → preview({ input, options })
Token cost summary               → get_token_summary()
Create layout handoff            → create_handoff({ rendered_html, metadata })
Apply layout handoff changes     → apply_handoff({ handoff_id, changes })
```

### Tool Signatures

#### `list_components()`
Returns the array of all 27 component names.

#### `get_manifest({ name })`
Returns the full JSON manifest: props, allowed values, forbidden props, emmet, do/don't, examples.

#### `get_emmet({ name })`
Returns the Emmet abbreviation string for a component.

#### `validate({ html })`
Returns `{ valid, score, errors, warnings }`.
Score formula: `max(0, 100 − errors × 10)`.

Error codes: `FORBIDDEN_CLASS` · `INVALID_VALUE` · `UNKNOWN_ATTRIBUTE` · `MISSING_REQUIRED` · `WRONG_ELEMENT` · `PROP_EXPLOSION` · `JS_ON_CSS_COMPONENT` · `MISSING_SLOT`

#### `how_to_build({ description })`
Returns `{ emmet, html, components_used, confidence, tokens, source }`.
- `confidence` 0–1. If < 0.3, call `list_components()` to refine.
- `source`: `"intent-table"` (fast) or `"vector-index"` (semantic fallback).

#### `generate_theme({ prompt })`
Returns `{ primary, isDark, css }`. The `css` field is a ready-to-paste `:root { ... }` block.

Prompt keywords: `dark` `night` `midnight` `cyberpunk` `dim` (dark mode) · `sharp` `flat` `square` (0px radius) · `round` `pill` `soft` (large radius) · any colour name (`blue`, `teal`, `rose`, `emerald`, etc.)

#### `check_a11y({ html })`
Returns `{ score, passes, issues }`.
Score formula: `max(0, 100 − errors × 10 − warnings × 3)`.
Checks 16 WCAG AA rules: alt text, form labels, empty labels, button names, link purpose, ARIA states, duplicate IDs, tabindex, heading hierarchy, table structure, dialog accessibility, ARIA roles, autocomplete, focus style, language of page.

#### `preview({ input, options })`
Renders Emmet shorthand or HTML to a base64 PNG data URL.

#### `get_token_summary()`
Returns a summary of token consumption for the current session.

#### `create_handoff({ rendered_html, metadata })`
Creates a state snapshot envelope for multi-agent layout exchange.

#### `apply_handoff({ handoff_id, changes })`
Patches an existing handoff snapshot with partial component changes.

---

## 12. Typical AI Workflow

```
1. how_to_build({ description: "a danger confirmation dialog" })
   → emmet, html, components_used, confidence

2. validate({ html: "..." })
   → { valid: true, score: 100 }

3. check_a11y({ html: "..." })
   → { score: 100, passes: [...], issues: [] }

4. generate_theme({ prompt: "dark teal round" })   ← optional
   → :root { ... }
```

---

## 13. Emmet Quick Reference

```
# Buttons
button[data-intent=primary]{Save}
button[data-intent=danger]{Delete}
button[data-intent=ghost]{Cancel}
button[aria-busy=true data-intent=primary]{Saving…}
button[disabled data-intent=primary]{Unavailable}

# Form inputs (always inside label)
label>input[type=email required]
label>input[type=password required]
label>input[type=text aria-invalid=true]
label>input[type=checkbox]+{I agree}
label>(input[type=radio name=plan value=pro]+{Pro})

# Alert (native aside — NOT ix-alert)
aside[data-intent=success]{Saved successfully.}
aside[data-intent=danger]{Something went wrong.}
aside[data-intent=warning]{Session expiring soon.}
aside[data-intent=info]{Syncs every 5 minutes.}

# Badge / mark
mark[data-intent=success]{Active}
mark[data-intent=danger]{Failed}
mark[data-intent=warning]{Pending}
mark[data-intent=neutral]{Draft}

# Skeleton loaders
span[role=status aria-busy=true data-shape=text]
span[role=status aria-busy=true data-shape=rect]
span[role=status aria-busy=true data-shape=circle]
span[role=status aria-busy=true data-shape=text data-lines=3]

# Dialog
dialog#confirm[data-intent=danger]>(h2{Are you sure?})+p{Cannot undo.}+[data-actions]>(button{Cancel})+(button[data-intent=danger]{Delete})

# Sortable table (section wraps for scroll; data-sortable on th)
section>table[is=ix-table]>(thead>tr>(th[data-sortable]{Name}+th[data-sortable]{Status}+th{Actions}))+(tbody>tr>(td{Alice}+td>mark[data-intent=success]{Active}))

# Grid
section[data-grid=3 data-gap=md]>article*3
section[data-grid=auto]>article*5
section[data-grid=3]>(article[data-col=2])+(article*2)

# Code block
pre>code[data-lang=js]{const x = 42}

# Divider
hr[data-orientation=vertical]
```

---

## 14. File Index

| File | Purpose |
|------|---------|
| [`SKILL.md`](SKILL.md) | This file — master AI reference |
| [`assets/design-tokens.json`](assets/design-tokens.json) | All `--ix-*` CSS tokens |
| [`assets/intents.json`](assets/intents.json) | `data-intent` values for all 27 components |
| [`references/api-guide.md`](references/api-guide.md) | All 7 MCP tools fully documented |
| [`references/examples.md`](references/examples.md) | Real MCP call/response examples |
| [`templates/component.html.template`](templates/component.html.template) | Complete HTML page showing every component |
| [`scripts/validate.js`](scripts/validate.js) | Asset consistency checker |
| [`scripts/test-mcp.sh`](scripts/test-mcp.sh) | MCP smoke test script |
