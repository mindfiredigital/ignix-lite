# Ignix-Lite MCP — API Guide

Ignix-Lite MCP is a **Model Context Protocol** server (`packages/mcp`) that exposes 7 tools for AI assistants to generate, validate and theme Ignix-Lite UI components.

## Server Info

| Field   | Value                          |
|---------|-------------------------------|
| Name    | `ignix-lite`                   |
| Version | `2.0.0`                        |
| Transport | stdio (JSON-RPC)             |
| Protocol | MCP SDK (`@modelcontextprotocol/sdk`) |

---

## Tools Reference

### 1. `list_components`

Lists all registered Ignix-Lite components.

**Input schema:** `{}` *(no arguments)*

**Returns:**
```json
{
  "components": ["accordion", "alert", "avatar", "badge", "breadcrumb",
    "button", "card", "checkbox", "codeblock", "combobox",
    "dialog", "divider", "dropdown", "form", "grid",
    "input", "meter", "navigation", "progress", "radio",
    "select", "skeleton", "tab", "table", "textarea",
    "toast", "tooltip"]
}
```

---

### 2. `get_manifest`

Returns the full component manifest (props, states, examples, emmet pattern).

**Input:** `{ "name": "<component-name>" }`

**Returns:** Full JSON manifest with:
- `component` — canonical name
- `version` — e.g. `"2.0"`
- `element` — HTML tag used
- `emmet` — Emmet abbreviation template
- `props` — prop definitions with type, values, agent_hint
- `states` — native state attributes
- `forbidden_props` — attributes that must NOT be used
- `do` / `dont` — usage guidance
- `examples` — labelled HTML snippets

---

### 3. `get_emmet`

Returns just the Emmet abbreviation for a component.

**Input:** `{ "name": "<component-name>" }`

**Returns:**
```json
{ "emmet": "button[data-intent=?]{label}" }
```

---

### 4. `validate`

Validates Ignix-Lite HTML markup against the component manifest rules.

**Input:** `{ "html": "<your html string>" }`

**Returns:**
```json
{
  "valid": true | false,
  "score": 0–100,
  "errors": [
    {
      "element": "button",
      "prop": "class",
      "type": "FORBIDDEN_CLASS",
      "message": "class attribute not allowed",
      "fix": "<button>...</button>",
      "confidence": 0.99
    }
  ]
}
```

**Error types:**
| Type | Meaning |
|------|---------|
| `UNKNOWN_ATTRIBUTE` | Attribute not in manifest or native allowlist |
| `INVALID_VALUE` | Enum value not in allowed set |
| `FORBIDDEN_CLASS` | `class=` used (always forbidden) |
| `MISSING_REQUIRED` | Required prop or wrapper missing |
| `WRONG_ELEMENT` | Non-Ignix-Lite HTML element used |
| `PROP_EXPLOSION` | More than 4 attributes on one element |
| `JS_ON_CSS_COMPONENT` | `on*` event handlers are forbidden |
| `MISSING_SLOT` | Required named slot not present |

---

### 5. `how_to_build`

Converts a plain-English description into Ignix-Lite Emmet + expanded HTML.

**Input:** `{ "description": "a danger button to delete an item" }`

**Returns:**
```json
{
  "emmet": "button[data-intent=danger]{Delete}",
  "html": "<button data-intent=\"danger\">Delete</button>",
  "components_used": ["button"],
  "confidence": 0.85,
  "tokens": 5,
  "source": "intent-table"
}
```

**Matching layers:**
1. **Layer 1 — Intent table** (`api-full.txt` INTENTS block): fast, deterministic, hand-crafted patterns. Threshold score = 8. Direct trust at score ≥ 18.
2. **Layer 2 — Vector index** (cosine similarity on TF-IDF embeddings): semantic fallback for novel descriptions.

**Stitch mode:** If the description contains `and`, `plus`, `+`, or `,`, the engine stitches multiple matching templates together.

---

### 6. `generate_theme`

Generates a complete `:root` CSS custom-property theme from a text prompt.

**Input:** `{ "prompt": "dark blue sharp" }`

**Returns:**
```json
{
  "prompt": "dark blue sharp",
  "primary": "#3b82f6",
  "isDark": true,
  "css": ":root { --ix-primary: #3b82f6; ... }"
}
```

**Prompt keywords:**
- **Colours:** any named colour (`blue`, `teal`, `rose`, `emerald`, etc.)
- **Dark mode:** `dark`, `night`, `midnight`, `cyberpunk`, `dim`
- **Shape — sharp:** `sharp`, `flat`, `square` → radius = 0px
- **Shape — round:** `round`, `pill`, `soft` → radius = 0.75rem/1rem
- Default radius = 0.375rem / 0.5rem

---

### 7. `check_a11y`

Checks HTML against 16 WCAG AA accessibility rules.

**Input:** `{ "html": "<your html string>" }`

**Returns:**
```json
{
  "score": 80,
  "passes": ["WCAG 1.1.1 Non-text Content", "WCAG 4.1.1 Parsing"],
  "issues": [
    {
      "rule": "WCAG 2.4.4 Link Purpose",
      "type": "error",
      "message": "Link has no accessible name",
      "element": "<a href=\"/\"></a>",
      "suggestion": "Add text content or aria-label",
      "fix": "<a href=\"/\" aria-label=\"Home\"></a>",
      "confidence": 0.97
    }
  ],
  "wcag": "AA"
}
```

**Rules checked:**
| Rule | WCAG Criterion |
|------|---------------|
| `checkImages` | 1.1.1 Non-text Content |
| `checkFormLabels` | 1.3.1 Form Labels |
| `checkEmptyLabels` | 2.4.6 Empty Labels |
| `checkButtons` | 4.1.2 Button Names |
| `checkLinks` | 2.4.4 Link Purpose |
| `checkAriaStates` | 3.3.1 Error Identification / 4.1.2 ARIA States |
| `checkDuplicateIds` | 4.1.1 Parsing |
| `checkTabIndex` | 2.1.1 Keyboard |
| `checkHeadings` | 2.4.6 Heading Hierarchy |
| `checkTables` | 1.3.1 Table Structure |
| `checkDialogs` | 4.1.2 Dialog Accessibility |
| `checkRoles` | 4.1.2 ARIA Role Requirements |
| `checkAutocomplete` | 1.3.5 Input Purpose |
| `checkFocusStyle` | 2.4.7 Focus Visible |
| `checkLang` | 3.1.1 Language of Page |

**Score formula:** `max(0, 100 − errors×10 − warnings×3)`

**Confidence scores** are rule-specific (from `RULE_CONFIDENCES` map in `check-a11y.ts`), not hardcoded.

---

## Core Design Rules

> Ignix-Lite is a **zero class-name, zero JS (95%)** design system.
> Styling is driven **exclusively** by `data-intent` and native HTML state attributes.

1. **Never** use `class=`, `variant=`, `color=`, `isDisabled=`, `isLoading=` or any React-style prop.
2. **Always** use native HTML elements (`button`, `input`, `dialog`, `details`, `progress`, `meter`).
3. **State** is expressed with native attributes: `disabled`, `aria-busy`, `aria-invalid`, `open`, `checked`, `required`, `aria-hidden`, `aria-expanded`, `aria-selected`.
4. Custom elements (`ix-*`) are used only where no native element exists (e.g. `ix-alert`, `ix-toast`, `ix-avatar`, `ix-tab`, `ix-tooltip`, `ix-skeleton`, `ix-codeblock`, `ix-combobox`).
5. **Never** add inline `style=` for theming — use `generate_theme` to get a `:root` CSS block.
