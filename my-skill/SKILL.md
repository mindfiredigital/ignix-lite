# Ignix-Lite v2 — Skill Reference

> **One-stop reference for AI assistants working with the Ignix-Lite design system.**
> Read this file before calling any MCP tool.

---

## What is Ignix-Lite?

Ignix-Lite is a **native HTML + ~8 KB CSS design system**.

- **Zero class names.** Never use `class=`.
- **Zero JS (95%).** Nearly everything is driven by CSS attribute selectors.
- **Styled exclusively via `data-intent` and native HTML state attributes.**

---

## The Golden Rules

| Rule | Detail |
|------|--------|
| ✅ Use `data-intent` | The only styling hook for components |
| ✅ Use native state attrs | `disabled`, `aria-busy`, `aria-invalid`, `open`, `checked`, `required`, `aria-hidden`, `aria-expanded`, `aria-selected`, `aria-current`, `aria-sort` |
| ✅ Use native elements | `button`, `input`, `dialog`, `details`, `progress`, `meter`, `form`, `nav`, `table` |
| ❌ Never `class=` | Absolutely forbidden on any Ignix component |
| ❌ Never `variant=` | Framework-style prop — does not exist |
| ❌ Never `color=` | Framework-style prop — does not exist |
| ❌ Never `isLoading=` / `isDisabled=` | React-style props — use `aria-busy` / `disabled` |
| ❌ Never `style=` for theming | Use `generate_theme` MCP tool instead |
| ❌ Never `on*=` handlers | JS event handlers are forbidden on Ignix components |
| ❌ Never >4 attributes | Prop explosion rule (PROP_EXPLOSION validator error) |

---

## MCP Tools (7 total)

| Tool | Purpose |
|------|---------|
| `list_components` | List all 27 components |
| `get_manifest` | Full component manifest (props, states, examples, emmet) |
| `get_emmet` | Emmet shorthand for a component |
| `validate` | Validate HTML against manifest rules |
| `how_to_build` | Plain English → Emmet + HTML |
| `generate_theme` | Create `:root` CSS tokens from a prompt |
| `check_a11y` | WCAG AA accessibility audit (16 rules) |

Full documentation: [`references/api-guide.md`](references/api-guide.md)
Usage examples: [`references/examples.md`](references/examples.md)

---

## Components (27)

```
accordion  alert    avatar    badge       breadcrumb
button     card     checkbox  codeblock   combobox
dialog     divider  dropdown  form        grid
input      meter    navigation  progress  radio
select     skeleton  tab       table      textarea
toast      tooltip
```

### Custom Elements (`ix-*`)
Used **only** when no native HTML element exists:

| Custom Element | Purpose |
|----------------|---------|
| `ix-alert` | Alert/banner messages |
| `ix-toast` | Transient notifications |
| `ix-avatar` | User avatars |
| `ix-tab` | Tabbed panels |
| `ix-tooltip` | Hover tooltips |
| `ix-skeleton` | Loading placeholders |
| `ix-codeblock` | Code display |
| `ix-combobox` | Search-as-you-type select |

### Native Elements (preferred)
`button` · `input` · `select` · `textarea` · `dialog` · `details` · `progress` · `meter` · `form` · `nav` · `table` · `hr` · `mark` · `span[role=status]`

---

## `data-intent` Quick Reference

| Component | Valid `data-intent` values |
|-----------|---------------------------|
| `button` | `primary` `danger` `warning` `success` `neutral` `ghost` |
| `input` | `text` `search` `email` `password` `number` `tel` `url` `date` `time` `file` |
| `textarea` | `default` `resize` `fixed` |
| `alert` | `info` `success` `warning` `danger` |
| `badge / mark` | `primary` `success` `warning` `danger` `neutral` |
| `toast` | `info` `success` `warning` `danger` |
| `card` | `default` `interactive` |
| `dialog` | `default` `danger` |
| `dropdown` | `menu` `select` |
| `navigation` | `sidebar` `topbar` `tabs` |
| `progress` | `default` `success` `danger` |
| `form` | `default` `inline` `grid` |
| `divider` | `horizontal` `vertical` |
| `avatar` | `image` `initials` `icon` |
| `grid` | `2` `3` `4` `5` `6` `auto` |
| `tooltip` | *(uses `data-position` instead: `top` `bottom` `left` `right`)* |

Full intents map: [`assets/intents.json`](assets/intents.json)

---

## Theming

Theme tokens are CSS custom properties on `:root`, all prefixed `--ix-`.

**Always** generate themes with the `generate_theme` tool:
```
generate_theme({ prompt: "dark blue sharp" })
→ returns :root { --ix-primary: #3b82f6; --ix-radius: 0px; ... }
```

**Prompt keywords:**
- Colour name: `blue`, `teal`, `rose`, `emerald`, `purple`, etc.
- Dark mode: `dark`, `night`, `midnight`, `cyberpunk`, `dim`
- Shape — sharp: `sharp`, `flat`, `square`
- Shape — round: `round`, `pill`, `soft`

Full token catalogue: [`assets/design-tokens.json`](assets/design-tokens.json)

---

## Validation

Run the `validate` MCP tool after writing any HTML:

```
validate({ html: "<button data-intent=\"primary\">Save</button>" })
→ { "valid": true, "score": 100, "errors": [] }
```

**Score formula:** `max(0, 100 − errors × 10)`

| Error type | Meaning |
|------------|---------|
| `FORBIDDEN_CLASS` | `class=` used |
| `INVALID_VALUE` | Enum value not in allowed set |
| `UNKNOWN_ATTRIBUTE` | Attribute not in manifest |
| `MISSING_REQUIRED` | Required prop/wrapper absent |
| `WRONG_ELEMENT` | Invalid HTML element |
| `PROP_EXPLOSION` | More than 4 attributes |
| `JS_ON_CSS_COMPONENT` | `on*` handler used |
| `MISSING_SLOT` | Required named slot absent |

---

## Accessibility

Run `check_a11y` after writing any HTML:

```
check_a11y({ html: "..." })
→ { "score": 100, "passes": [...], "issues": [], "wcag": "AA" }
```

**Score formula:** `max(0, 100 − errors × 10 − warnings × 3)`

16 rules checked (WCAG AA): images, form labels, empty labels, button names, link purpose, ARIA states, duplicate IDs, tabindex, heading hierarchy, table structure, dialogs, ARIA roles, autocomplete, focus style, language of page.

---

## Typical AI Assistant Workflow

```
1. how_to_build({ description: "a danger button to delete a record" })
   → emmet, html, components_used, confidence

2. validate({ html: "<button data-intent=\"danger\">Delete</button>" })
   → { valid: true, score: 100 }

3. check_a11y({ html: "..." })
   → { score: 100, passes: [...], issues: [] }

4. (optional) generate_theme({ prompt: "dark teal round" })
   → :root { ... }
```

---

## File Index

| File | Purpose |
|------|---------|
| [`SKILL.md`](SKILL.md) | This file — master skill reference |
| [`assets/design-tokens.json`](assets/design-tokens.json) | Full `--ix-*` token catalogue |
| [`assets/intents.json`](assets/intents.json) | `data-intent` values for all components |
| [`references/api-guide.md`](references/api-guide.md) | All 7 MCP tools documented |
| [`references/examples.md`](references/examples.md) | Real call/response examples for all tools |
| [`templates/component.html.template`](templates/component.html.template) | Complete HTML page showcasing every component |
| [`scripts/validate.js`](scripts/validate.js) | Asset consistency checker (`node my-skill/scripts/validate.js`) |
| [`scripts/test-mcp.sh`](scripts/test-mcp.sh) | MCP smoke test (`bash my-skill/scripts/test-mcp.sh`) |
