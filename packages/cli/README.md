# @mindfiredigital/ignix-lite-cli

> The official command-line tool for [Ignix-Lite](https://github.com/mindfiredigital/ignix-lite) — a zero-JS, CSS-only UI component framework driven entirely by semantic HTML and `data-*` attributes.

[![npm version](https://img.shields.io/npm/v/@mindfiredigital/ignix-lite-cli)](https://www.npmjs.com/package/@mindfiredigital/ignix-lite-cli)
[![license](https://img.shields.io/npm/l/@mindfiredigital/ignix-lite-cli)](LICENSE)

---

## What is Ignix-Lite CLI?

`ignix-lite` is a developer productivity tool that lets you:

- **Scaffold** components and project config in seconds
- **Generate** UI markup from plain English descriptions
- **Validate** your HTML against Ignix-Lite design rules
- **Audit** your markup for WCAG 2.2 accessibility issues
- **Theme** your project by describing the look you want
- **Preview** any HTML/Emmet file as a rendered PNG image
- **Connect** your editor (Claude Desktop, Claude Code, Gemini CLI, Cursor) to the Ignix-Lite MCP server

---

## Installation

```bash
npm install -g @mindfiredigital/ignix-lite-cli
```

Or use it without installing via `npx`:

```bash
npx @mindfiredigital/ignix-lite-cli <command>
```

---

## Quick Start

```bash
# 1. Set up a new project
ignix-lite init

# 2. Generate UI from a description
ignix-lite build "a login form with email and password"

# 3. Validate your markup
ignix-lite validate src/index.html

# 4. Check accessibility
ignix-lite check-a11y src/index.html
```

---

## Commands

### `ignix-lite init`

Initialize Ignix-Lite in your project. Creates an `ignix.config.json` and injects CSS theme variables into your stylesheet.

```bash
ignix-lite init
```

**Interactive prompts:**

- Framework: Vanilla HTML
- CSS file path (e.g. `src/index.css`)
- Primary theme color (hex, e.g. `#6366f1`)

**Output:**

```
✔ Ignix-Lite initialized successfully!

Created ignix.config.json
Updated theme variables in src/index.css
```

---

### `ignix-lite build <prompt>`

Generate Ignix-Lite HTML (or Emmet shorthand) from a **plain English description**. Powered by the intent engine — no AI API key required.

```bash
ignix-lite build "a danger button that says Delete"
ignix-lite build "a login form with email and password inputs"
ignix-lite build "a warning alert that says Session will expire soon"
```

**Options:**

| Flag                  | Description                                     |
| --------------------- | ----------------------------------------------- |
| `-o, --output <file>` | Write the HTML output to a file                 |
| `-e, --emmet-only`    | Output the Emmet shorthand instead of full HTML |

**Examples:**

```bash
# Print HTML to terminal
ignix-lite build "a primary button that says Save Changes"

# Save to file
ignix-lite build "a user profile card" --output card.html

# Get Emmet shorthand
ignix-lite build "a search bar with a submit button" --emmet-only
```

**Sample output:**

```html
<button data-intent="primary">Save Changes</button>
```

---

### `ignix-lite add <component>`

Print a ready-to-use HTML template for any Ignix-Lite component.

```bash
ignix-lite add button
ignix-lite add accordion
ignix-lite add tooltip
```

**Available components:**

| Component   | Component    | Component    |
| ----------- | ------------ | ------------ |
| `accordion` | `alert`      | `avatar`     |
| `badge`     | `breadcrumb` | `button`     |
| `card`      | `checkbox`   | `codeblock`  |
| `combobox`  | `dialog`     | `divider`    |
| `dropdown`  | `form`       | `grid`       |
| `input`     | `meter`      | `navigation` |
| `progress`  | `radio`      | `select`     |
| `skeleton`  | `table`      | `tabs`       |
| `textarea`  | `toast`      | `tooltip`    |

---

### `ignix-lite validate <file>`

Validate an HTML file against Ignix-Lite design rules. Checks for correct usage of `data-intent`, `data-size`, slot attributes, and forbidden patterns like `class=` or `color=`.

```bash
ignix-lite validate src/index.html
```

**Sample output:**

```
🔍 Validation Report
════════════════════════════════════════════════════════════
File: src/index.html

✘ FAIL: Validation failed with 2 violation(s)
Score: 60/100

[Violation 1]
  Line:    12
  Element: <button>
  Problem: Use data-intent instead of class for styling
  Fix:     Replace class="btn-danger" with data-intent="danger"
```

---

### `ignix-lite check-a11y <file>`

Audit an HTML file for WCAG 2.2 accessibility issues. Reports errors and warnings with actionable fixes.

```bash
ignix-lite check-a11y src/index.html
```

**Sample output:**

```
♿ Accessibility Audit Report
════════════════════════════════════════════════════════════
File:       src/index.html
Standards:  WCAG 2.2 AA
Summary:    Passed 8 rules, Found 1 issue(s)

✘ FAIL: Accessibility check failed. Score: 80/100

[Issue 1] ✘ missing-alt (ERROR)
  Element: <img src="avatar.png">
  Message: Images must have an alt attribute
  Fix:     Add alt="descriptive text" to the <img> element
```

---

### `ignix-lite theme [prompt]`

Generate CSS theme variables from a natural language description or a hex color and write them to your stylesheet.

```bash
ignix-lite theme "dark mode with blue primary"
ignix-lite theme --primary "#e11d48"
ignix-lite theme "earthy green tones" --style-file src/styles/theme.css
```

**Options:**

| Flag                      | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `-p, --primary <color>`   | Explicit primary color (hex or HSL)                    |
| `-s, --style-file <path>` | Target stylesheet path (overrides `ignix.config.json`) |

**Sample output:**

```
✔ Theme successfully updated in src/index.css
Resolved primary color: #e11d48
Mode: Light
```

> **Note:** Requires `ignix.config.json` (created by `ignix-lite init`) unless `--style-file` is specified.

---

### `ignix-lite list`

List all available Ignix-Lite components.

```bash
ignix-lite list
```

---

### `ignix-lite info <component>`

Show the full manifest, allowed props, and usage guidelines for a specific component.

```bash
ignix-lite info button
ignix-lite info tooltip
```

---

### `ignix-lite preview <file>`

Render an HTML or Emmet file in a headless browser and save a PNG screenshot. Useful for quick visual checks without opening a browser.

```bash
ignix-lite preview src/index.html
ignix-lite preview component.html --output screenshot.png --width 800 --theme dark
```

**Options:**

| Flag                        | Default       | Description              |
| --------------------------- | ------------- | ------------------------ |
| `-o, --output <file>`       | `preview.png` | Output image path        |
| `-w, --width <pixels>`      | `400`         | Viewport width in pixels |
| `-t, --theme <light\|dark>` | system        | Emulated color scheme    |

---

### `ignix-lite mcp setup <client>`

Automatically configure the Ignix-Lite MCP server for your AI editor. **Zero manual steps** — the CLI writes directly to the editor's config file.

```bash
ignix-lite mcp setup claude
ignix-lite mcp setup claude-code
ignix-lite mcp setup gemini
ignix-lite mcp setup cursor
```

**All clients are fully auto-configured.** After running the command:

| Client                      | Config File Written                           | Next Step                                      |
| --------------------------- | --------------------------------------------- | ---------------------------------------------- |
| `claude` / `claude-desktop` | `%APPDATA%\Claude\claude_desktop_config.json` | Restart Claude Desktop                         |
| `claude-code`               | `~/.claude.json`                              | Open any project with `claude`                 |
| `gemini`                    | `~/.gemini/settings.json`                     | Start a new `gemini` session                   |
| `cursor`                    | `~/.cursor/mcp.json`                          | Reload Cursor (`Ctrl+Shift+P` → Reload Window) |

**No client argument?** Running `ignix-lite mcp setup` without an argument prints a help menu listing all supported clients.

---

### `ignix-lite mcp start`

Start the Ignix-Lite MCP server directly. Useful for testing or custom integrations.

```bash
ignix-lite mcp start
```

---

## The `ignix.config.json` File

Created by `ignix-lite init`. Most commands read this file automatically.

```json
{
  "framework": "vanilla",
  "style": "src/index.css",
  "theme": {
    "primary": "#6366f1"
  }
}
```

---

## Using with AI Editors (MCP)

Ignix-Lite ships with a full **MCP server** that exposes all engine tools to AI assistants. Once set up, your AI can generate components, validate markup, audit accessibility, and preview components — all from natural language in the chat.

**One command. Zero manual config.**

```bash
ignix-lite mcp setup claude        # Claude Desktop
ignix-lite mcp setup claude-code   # Claude Code CLI
ignix-lite mcp setup gemini        # Gemini CLI
ignix-lite mcp setup cursor        # Cursor editor
```

Then just start chatting:

> _"Build me a login form with a warning alert at the top"_
> _"Validate my index.html for Ignix-Lite design rules"_
> _"Generate a dark theme with blue primary color"_

---

## How `ignix-lite build` Works

The `build` command uses a **two-layer intent engine** (no external API needed):

1. **Intent Table** (Layer 1) — A hand-crafted table of ~40 common patterns. Fast, deterministic, high confidence.
2. **Vector Index** (Layer 2) — A local semantic index for novel or complex descriptions.

The engine supports **multi-component stitching** — when your description mentions multiple components (using "and", "with", etc.), it synthesizes them together:

```bash
ignix-lite build "an avatar image and a loading skeleton below it"
# → img[src="?" alt="User" data-size=md] + span[role=status aria-busy=true data-shape=rect]
```

---

## Related Packages

| Package                                           | Description                                                  |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [`@mindfiredigital/ignix-lite-engine`](../engine) | Core engine: intent resolution, validation, theming, preview |
| [`@mindfiredigital/ignix-lite-mcp`](../mcp)       | MCP server exposing all engine tools to AI editors           |

---

## License

MIT © [Mindfire Digital](https://www.mindfiredigital.com)
