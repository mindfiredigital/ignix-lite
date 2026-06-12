# Ignix-Lite MCP — Usage Examples

A hands-on reference of real MCP tool calls and their responses.

---

## `list_components` — Discover available components

**Call:**
```json
{ "tool": "list_components", "arguments": {} }
```

**Response:**
```json
{
  "components": [
    "accordion", "alert", "avatar", "badge", "breadcrumb",
    "button", "card", "checkbox", "codeblock", "combobox",
    "dialog", "divider", "dropdown", "form", "grid",
    "input", "meter", "navigation", "progress", "radio",
    "select", "skeleton", "tab", "table", "textarea",
    "toast", "tooltip"
  ]
}
```

---

## `get_manifest` — Inspect a component

**Call:**
```json
{ "tool": "get_manifest", "arguments": { "name": "button" } }
```

**Response (excerpt):**
```json
{
  "component": "button",
  "version": "2.0",
  "element": "button",
  "emmet": "button[data-intent=?]{label}",
  "props": {
    "data-intent": {
      "type": "enum",
      "values": ["primary", "danger", "warning", "success", "neutral", "ghost"],
      "default": "primary",
      "agent_hint": "Use danger for destructive actions. Use ghost for secondary actions."
    },
    "disabled": { "type": "boolean", "native": true },
    "aria-busy": { "type": "boolean", "native": true, "agent_hint": "Use for loading state" }
  },
  "forbidden_props": ["variant", "color", "class", "isLoading", "isDisabled", "size"],
  "examples": [
    { "label": "Primary button", "html": "<button data-intent=\"primary\">Save</button>" },
    { "label": "Danger button",  "html": "<button data-intent=\"danger\">Delete</button>" },
    { "label": "Loading button", "html": "<button aria-busy=\"true\">Saving...</button>" }
  ]
}
```

---

## `get_emmet` — Get Emmet shorthand

**Call:**
```json
{ "tool": "get_emmet", "arguments": { "name": "input" } }
```

**Response:**
```json
{ "emmet": "label>input[data-intent=text]" }
```

---

## `how_to_build` — Plain English → HTML

### Example 1: Single component
**Call:**
```json
{ "tool": "how_to_build", "arguments": { "description": "a danger button to delete a record" } }
```
**Response:**
```json
{
  "emmet": "button[data-intent=danger]{Delete}",
  "html": "<button data-intent=\"danger\">Delete</button>",
  "components_used": ["button"],
  "confidence": 0.88,
  "tokens": 5,
  "source": "intent-table"
}
```

### Example 2: Composite (stitching)
**Call:**
```json
{ "tool": "how_to_build", "arguments": { "description": "a search input and a primary submit button" } }
```
**Response:**
```json
{
  "emmet": "label>input[data-intent=search]+button[data-intent=primary]{Search}",
  "html": "<label><input data-intent=\"search\"><button data-intent=\"primary\">Search</button></label>",
  "components_used": ["input", "button"],
  "confidence": 0.82,
  "tokens": 12,
  "source": "intent-table"
}
```

### Example 3: Vector fallback
**Call:**
```json
{ "tool": "how_to_build", "arguments": { "description": "a collapsible FAQ section" } }
```
**Response:**
```json
{
  "emmet": "details>summary{Question}+p{Answer}",
  "html": "<details><summary>Question</summary><p>Answer</p></details>",
  "components_used": ["accordion"],
  "confidence": 0.55,
  "tokens": 8,
  "source": "vector-index"
}
```

---

## `validate` — Check markup correctness

### Valid markup
**Call:**
```json
{
  "tool": "validate",
  "arguments": { "html": "<button data-intent=\"primary\">Save</button>" }
}
```
**Response:**
```json
{ "valid": true, "score": 100, "errors": [] }
```

### Invalid markup — class used
**Call:**
```json
{
  "tool": "validate",
  "arguments": { "html": "<button class=\"btn-primary\">Save</button>" }
}
```
**Response:**
```json
{
  "valid": false,
  "score": 90,
  "errors": [
    {
      "element": "button",
      "prop": "class",
      "type": "FORBIDDEN_CLASS",
      "message": "class attribute not allowed",
      "fix": "<button>Save</button>",
      "confidence": 0.99
    }
  ]
}
```

### Invalid markup — wrong intent value
**Call:**
```json
{
  "tool": "validate",
  "arguments": { "html": "<button data-intent=\"destructive\">Delete</button>" }
}
```
**Response:**
```json
{
  "valid": false,
  "score": 90,
  "errors": [
    {
      "element": "button",
      "prop": "data-intent",
      "type": "INVALID_VALUE",
      "message": "'destructive' invalid",
      "valid_values": ["primary", "danger", "warning", "success", "neutral", "ghost"],
      "fix": "<button data-intent=\"primary\"></button>",
      "confidence": 0.97
    }
  ]
}
```

---

## `generate_theme` — Create a theme

### Dark blue sharp theme
**Call:**
```json
{ "tool": "generate_theme", "arguments": { "prompt": "dark blue sharp" } }
```
**Response:**
```json
{
  "prompt": "dark blue sharp",
  "primary": "#3b82f6",
  "isDark": true,
  "css": ":root {\n  --ix-primary: #3b82f6;\n  --ix-primary-hover: color-mix(in srgb, var(--ix-primary) 75%, white);\n  --ix-radius: 0px;\n  --ix-surface: #0f172a;\n  --ix-text: #f9fafb;\n  ...\n}"
}
```

### Light rose pill theme
**Call:**
```json
{ "tool": "generate_theme", "arguments": { "prompt": "light rose pill" } }
```
**Response:**
```json
{
  "prompt": "light rose pill",
  "primary": "#f43f5e",
  "isDark": false,
  "css": ":root {\n  --ix-primary: #f43f5e;\n  --ix-radius: 0.75rem;\n  --ix-radius-lg: 1rem;\n  --ix-badge-radius: 999px;\n  ...\n}"
}
```

---

## `check_a11y` — Accessibility audit

### Passing HTML
**Call:**
```json
{
  "tool": "check_a11y",
  "arguments": { "html": "<html lang=\"en\"><img src=\"photo.jpg\" alt=\"A scenic mountain view\"><button>Submit</button></html>" }
}
```
**Response:**
```json
{
  "score": 100,
  "passes": [
    "WCAG 1.1.1 Non-text Content",
    "WCAG 4.1.2 Button Names",
    "WCAG 3.1.1 Language of Page"
  ],
  "issues": [],
  "wcag": "AA"
}
```

### Failing HTML
**Call:**
```json
{
  "tool": "check_a11y",
  "arguments": { "html": "<img src=\"photo.jpg\"><button></button><a href=\"/\"></a>" }
}
```
**Response:**
```json
{
  "score": 60,
  "passes": ["WCAG 4.1.1 Parsing", "WCAG 2.1.1 Keyboard"],
  "issues": [
    {
      "rule": "WCAG 1.1.1 Non-text Content",
      "type": "error",
      "message": "img missing alt attribute",
      "element": "<img src=\"photo.jpg\">",
      "suggestion": "Add alt=\"\" for decorative images or a descriptive alt for informative images",
      "fix": "<img src=\"photo.jpg\" alt=\"\">",
      "confidence": 0.99
    },
    {
      "rule": "WCAG 4.1.2 Button Names",
      "type": "error",
      "message": "Button has no accessible name",
      "element": "<button></button>",
      "suggestion": "Add text content, aria-label, or aria-labelledby",
      "fix": "<button aria-label=\"Submit\"></button>",
      "confidence": 0.99
    },
    {
      "rule": "WCAG 2.4.4 Link Purpose",
      "type": "error",
      "message": "Link has no accessible name",
      "element": "<a href=\"/\"></a>",
      "suggestion": "Add link text or aria-label",
      "fix": "<a href=\"/\" aria-label=\"Home\"></a>",
      "confidence": 0.97
    },
    {
      "rule": "WCAG 3.1.1 Language of Page",
      "type": "error",
      "message": "<html> is missing lang attribute",
      "element": "<a href=\"/\"></a>",
      "suggestion": "Add lang=\"en\" to <html>",
      "fix": "<html lang=\"en\">",
      "confidence": 0.99
    }
  ],
  "wcag": "AA"
}
```

---

## Common Patterns

### Card with header and body
```html
<article>
  <header slot="header"><h2>Card Title</h2></header>
  <p slot="body">Card content here.</p>
</article>
```

### Form with labelled inputs
```html
<form data-intent="default">
  <label>
    Email
    <input data-intent="email" type="email" required>
  </label>
  <label>
    Password
    <input data-intent="password" type="password" required>
  </label>
  <button data-intent="primary" type="submit">Sign In</button>
</form>
```

### Loading button state
```html
<button aria-busy="true">Saving...</button>
```

### Danger dialog
```html
<dialog data-intent="danger" open>
  <h2>Delete item?</h2>
  <p>This action cannot be undone.</p>
  <button data-intent="danger" type="submit">Delete</button>
  <button data-intent="ghost">Cancel</button>
</dialog>
```

### Accessible data table
```html
<section>
  <table is="ix-table">
    <thead>
      <tr>
        <th scope="col" data-sortable aria-sort="ascending">Name</th>
        <th scope="col" data-sortable aria-sort="none">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice</td><td>Admin</td></tr>
      <tr><td>Bob</td><td>Editor</td></tr>
    </tbody>
  </table>
</section>
```

> **Note:** `data-sortable` goes on each `<th>` header, NOT on the `<table>` wrapper.
> Wrap in `<section>` to activate the responsive horizontal scroll rule.

---

## `preview` — Headless rendering of components

**Call:**
```json
{ "tool": "preview", "arguments": { "input": "button[data-intent=primary]{Click Me}", "options": { "width": 300, "theme": "light" } } }
```

**Response:**
```json
{
  "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
  "width": 300,
  "render_ms": 120,
  "tokens_used": 5
}
```

---

## `get_token_summary` — Get session token usage

**Call:**
```json
{ "tool": "get_token_summary", "arguments": { "context_window": 128000 } }
```

**Response:**
```json
{
  "session_id": "session_abc123",
  "calls": [
    { "tool": "list_components", "tokens_used": 8, "timestamp": 1745000000000 },
    { "tool": "validate", "tokens_used": 12, "timestamp": 1745000010000 }
  ],
  "total_tokens_used": 20,
  "estimated_context_pct": 0.0156,
  "tokens_used": 20
}
```

---

## `create_handoff` — Initialize agent state snapshot

**Call:**
```json
{ "tool": "create_handoff", "arguments": { "rendered_html": "<button data-intent=\"primary\">Click Me</button>", "metadata": { "user_id": 123 } } }
```

**Response:**
```json
{
  "handoff_id": "hndff_xyz789",
  "snapshot": {
    "schema": "ignix-lite-handoff",
    "version": "1.0",
    "id": "hndff_xyz789",
    "timestamp": 1745000000000,
    "components": [
      {
        "selector": "button",
        "emmet": "button[data-intent=primary]{Click Me}",
        "state": { "data-intent": "primary" },
        "tokens": 4
      }
    ],
    "total_tokens": 4
  },
  "tokens_used": 10
}
```

---

## `apply_handoff` — Patch state snapshot

**Call:**
```json
{
  "tool": "apply_handoff",
  "arguments": {
    "handoff_id": "hndff_xyz789",
    "changes": [
      {
        "selector": "button",
        "action": "update",
        "emmet": "button[data-intent=danger]{Delete}"
      }
    ]
  }
}
```

**Response:**
```json
{
  "updated_html": "<button data-intent=\"danger\">Delete</button>",
  "diff_tokens": 4,
  "full_tokens": 4,
  "savings_pct": 0,
  "tokens_used": 15
}
```


