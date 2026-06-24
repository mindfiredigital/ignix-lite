# Ignix-Lite AI Skill

> AI guidelines, intent catalogs, design tokens, and validation tools for **Ignix-Lite**.

This package provides a standardized **AI Skill** model that teaches Large Language Models (LLMs) and MCP agents how to generate, validate, and style HTML layouts using the classless **Ignix-Lite** design system.

[![npm version](https://img.shields.io/npm/v/@mindfiredigital/ignix-lite-skill)](https://www.npmjs.com/package/@mindfiredigital/ignix-lite-skill)
[![license](https://img.shields.io/npm/l/@mindfiredigital/ignix-lite-skill)](LICENSE)


---

## Package Structure

*   **[`SKILL.md`](SKILL.md):** The master instruction guide for AI agents. It describes the design system's architecture, intent rules, states, and Emmet shortcuts.
*   **`assets/`:**
    *   **[`design-tokens.json`](assets/design-tokens.json):** The complete `:root` custom properties list (colors, margins, spacing, shapes).
    *   **[`intents.json`](assets/intents.json):** Component configuration mapping elements to their valid data-intent tags and native states.
*   **`references/`:**
    *   **[`api-guide.md`](references/api-guide.md):** A detailed technical manual for all 13 Model Context Protocol (MCP) server tools.
    *   **[`examples.md`](references/examples.md):** Verified MCP call and response structures.
*   **`templates/`:**
    *   **[`component.html.template`](templates/component.html.template):** Showcase template demonstrating all components styled natively with Ignix-Lite.
*   **`scripts/`:**
    *   **[`validate.js`](scripts/validate.js):** Verification script to ensure design tokens, guide docs, and manifests remain consistent.

---

## Validation

To ensure all guides and catalogs remain in sync with the core engine registry:

1.  Make sure you are in the workspace root.
2.  Run the validation script:
    ```bash
    node packages/skill/scripts/validate.js
    ```
