# Ignix-Lite MCP Server

An agent-optimized, Model Context Protocol (MCP) server for **Ignix-Lite**-the browser-native, classless, accessible CSS component library.

This MCP server equips AI coding agents with the runtime capabilities to discover, construct, validate, theme, and visually audit Ignix-Lite markup.

[![npm version](https://img.shields.io/npm/v/@mindfiredigital/ignix-lite-mcp)](https://www.npmjs.com/package/@mindfiredigital/ignix-lite-mcp)
[![license](https://img.shields.io/npm/l/@mindfiredigital/ignix-lite-mcp)](LICENSE)

---

## Key Features

- **Intent-to-UI (`how_to_build`):** Translates natural language descriptions (e.g., `"a confirmation modal with a red delete button"`) directly into semantic Emmet abbreviations and full HTML.
- **Structured Validation (`validate`):** Audits HTML elements against Ignix-Lite specifications and returns exact, copy-pasteable corrections on validation errors.
- **WCAG 2.2 Accessibility Audit (`check_a11y`):** Evaluates elements offline for 15+ WCAG AA criteria and suggests precise fixes.
- **Generative Theming (`generate_theme`):** Automatically computes contrast-compliant light/dark mode CSS custom variables from a single brand color.
- **Headless Visual Preview (`preview`):** Generates high-quality PNG screenshots of rendered components on-the-fly.
- **Token Receipt System (`get_token_summary`):** Provides token consumption receipts for every tool call to track agent context budget.
- **Multi-Agent Handoff Protocol (`create_handoff` / `apply_handoff`):** Allows multiple agents to exchange, modify, and patch layouts using lightweight selector diffs.
- **Composite Builder (`build_validated`):** Generates, validates, and audits accessibility of a component in one round-trip.
- **Token Cost Auditor (`get_token_cost`):** Compares the token footprint of Ignix-Lite vs Tailwind CSS to measure savings.
- **Bundled Resource (`manifests://all`):** Exposes all component manifests in a single JSON payload to avoid sequential discovery calls.

---

## Installation

```bash
npm install -g @mindfiredigital/ignix-lite-cli
```

> The MCP server is bundled with the CLI. You do **not** need to install the MCP package separately.

---

## Configuration - Zero Manual Steps

Use the CLI to auto-configure your editor in one command:

```bash
ignix-lite mcp setup claude        # Claude Desktop
ignix-lite mcp setup claude-code   # Claude Code CLI
ignix-lite mcp setup gemini        # Gemini CLI
ignix-lite mcp setup cursor        # Cursor editor
```

The CLI writes directly to your editor's config file. After running:

| Client                      | Next Step                                      |
| --------------------------- | ---------------------------------------------- |
| `claude` / `claude-desktop` | Restart Claude Desktop                         |
| `claude-code`               | Open any project with `claude`                 |
| `gemini`                    | Start a new `gemini` session                   |
| `cursor`                    | Reload Cursor (`Ctrl+Shift+P` → Reload Window) |

**Or start the server manually** (for testing or custom integrations):

```bash
ignix-lite mcp start
```

---

## Tool Catalogue

| Tool                | Parameters                                 | Description                                                                                      |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `list_components`   | _None_                                     | Lists all 28 available components (button, dialog, card, etc.).                                  |
| `get_manifest`      | `name: string`                             | Returns the full JSON specification, properties, slots, and do/don't rules for a component.      |
| `get_emmet`         | `name: string`                             | Returns the default Emmet shorthand pattern for a component.                                     |
| `how_to_build`      | `description: string`                      | Converts a plain English description into the best-fit Emmet and HTML output.                    |
| `validate`          | `html: string`                             | Validates HTML structure against Ignix-Lite rules, returning structured errors with exact fixes. |
| `check_a11y`        | `html: string`                             | Evaluates markup for accessibility and WCAG 2.2 AA compliance.                                   |
| `generate_theme`    | `prompt: string`                           | Generates a complete `:root` CSS custom property theme based on color keywords or hex values.    |
| `preview`           | `input: string, options?: object`          | headlessly renders Emmet or HTML to a base64 PNG data URL.                                       |
| `get_token_summary` | `context_window?: number`                  | Returns session stats showing total tokens used by the MCP server.                               |
| `create_handoff`    | `rendered_html: string, metadata?: object` | Creates a state snapshot envelope for multi-agent layout exchange.                               |
| `apply_handoff`     | `handoff_id: string, changes: array`       | Patches an existing handoff snapshot with partial component changes.                             |
| `build_validated`   | `description: string, options?: object`    | Build, validate, and audit the accessibility of a layout in a single round-trip.                 |
| `get_token_cost`    | `html: string`                             | Estimate and compare the token size of Ignix-Lite vs Tailwind CSS layout.                        |

---

## MCP Resources

The MCP server exposes the following resource:

| Resource URI      | Name                    | Description                                                                                                                                                  |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `manifests://all` | All Component Manifests | Returns a single JSON object mapping every component to its complete manifest, including Emmet patterns, properties, forbidden configurations, and examples. |

---

## Local Development

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

## License

MIT License. Designed and maintained by **Mindfire Digital**.
