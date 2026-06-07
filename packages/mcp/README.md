# @mindfiredigital/ignix-lite-mcp

An agent-optimized, Model Context Protocol (MCP) server for **Ignix-Lite**-the browser-native, classless, accessible CSS component library.

This MCP server equips AI coding agents with the runtime capabilities to discover, construct, validate, theme, and visually audit Ignix-Lite markup.

---

## 🚀 Key Features

* **Intent-to-UI (`how_to_build`):** Translates natural language descriptions (e.g., `"a confirmation modal with a red delete button"`) directly into semantic Emmet abbreviations and full HTML.
* **Structured Validation (`validate`):** Audits HTML elements against Ignix-Lite specifications and returns exact, copy-pasteable corrections on validation errors.
* **WCAG 2.2 Accessibility Audit (`check_a11y`):** Evaluates elements offline for 15+ WCAG AA criteria and suggests precise fixes.
* **Generative Theming (`generate_theme`):** Automatically computes contrast-compliant light/dark mode CSS custom variables from a single brand color.
* **Headless Visual Preview (`preview`):** Generates high-quality PNG screenshots of rendered components on-the-fly.
* **Token Receipt System (`get_token_summary`):** Provides token consumption receipts for every tool call to track agent context budget.
* **Multi-Agent Handoff Protocol (`create_handoff` / `apply_handoff`):** Allows multiple agents to exchange, modify, and patch layouts using lightweight selector diffs.

---

## 📦 Installation

To run the MCP server locally or configure it in your editor:

```bash
npm install -g @mindfiredigital/ignix-lite-mcp
```

Or run it directly using `npx`:

```bash
npx @mindfiredigital/ignix-lite-mcp
```

---

## ⚙️ Configuration

Add the server to your editor or client settings.

### Claude Desktop / Antigravity

Add this configuration to your local MCP settings file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ignix-lite": {
      "command": "npx",
      "args": ["-y", "@mindfiredigital/ignix-lite-mcp"]
    }
  }
}
```

---

## 🛠️ Tool Catalogue

| Tool | Parameters | Description |
|---|---|---|
| `list_components` | *None* | Lists all 27 available components (button, dialog, card, etc.). |
| `get_manifest` | `name: string` | Returns the full JSON specification, properties, slots, and do/don't rules for a component. |
| `get_emmet` | `name: string` | Returns the default Emmet shorthand pattern for a component. |
| `how_to_build` | `description: string` | Converts a plain English description into the best-fit Emmet and HTML output. |
| `validate` | `html: string` | Validates HTML structure against Ignix-Lite rules, returning structured errors with exact fixes. |
| `check_a11y` | `html: string` | Evaluates markup for accessibility and WCAG 2.2 AA compliance. |
| `generate_theme` | `prompt: string` | Generates a complete `:root` CSS custom property theme based on color keywords or hex values. |
| `preview` | `input: string, options?: object` | headlessly renders Emmet or HTML to a base64 PNG data URL. |
| `get_token_summary` | `context_window?: number` | Returns session stats showing total tokens used by the MCP server. |
| `create_handoff` | `rendered_html: string, metadata?: object` | Creates a state snapshot envelope for multi-agent layout exchange. |
| `apply_handoff` | `handoff_id: string, changes: array` | Patches an existing handoff snapshot with partial component changes. |

---

## 🧪 Local Development

Clone the main repository, install dependencies, and build the packages:

```bash
# Clone the repository
git clone https://github.com/mindfiredigital/ignix-lite.git
cd ignix-lite

# Install dependencies and build all packages
pnpm install
pnpm build
```

Run the server in development mode:

```bash
cd packages/mcp
pnpm dev
```

To test tools locally, you can use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

---

## 📄 License

MIT License. Designed and maintained by **Mindfire Digital**.
