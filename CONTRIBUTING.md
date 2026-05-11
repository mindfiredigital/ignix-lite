# Contributing to ignix-lite

Thanks for your interest in contributing! This project is a minimal, HTML-first UI system. Every contribution should respect its philosophy of simplicity and zero-abstraction.

---

# Core Philosophy

Before contributing, understand this:

> **ignix-lite is NOT a component framework.**

It is:
* **HTML-first**: No complex components, just native elements.
* **CSS-driven**: All styling is handled via pure CSS.
* **Minimal**: Zero dependencies for the core styles.
* **Attribute-based**: No `class` names. Use `data-*` and `aria-*` attributes.

---

# Getting Started

1.  **Clone the repo**
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Run Storybook** (for component development):
    ```bash
    pnpm storybook
    ```
4.  **Build everything**:
    ```bash
    pnpm build
    ```

---

# Development Workflow

### Picking a Task
1. Pick an issue (one component/feat per issue).
2. Create a branch: `feat/component-name` or `fix/issue-description`.

When adding a new component (e.g., `alert`), follow these steps:

1.  **CSS Implementation**:
    *   Create `packages/core/css/alert.css`.
    *   Import it in `packages/core/ignix-lite.css`.
2.  **Storybook**:
    *   Create `storybook/stories/alert/Alert.stories.ts`.
    *   Validate variants, states, and accessibility.
3.  **Testing**:
    *   Create `tests/alert.test.ts`.
    *   Verify that the component uses the correct attributes and **no classes**.
4.  **Documentation**:
    *   Create `docs/alert.html` showing examples.
    *   Link to it in `docs/index.html`.

---

# System Rules (MANDATORY)

### Do NOT
*   **Use `class` for styling**: Styling MUST be attached to elements or `data-intent`.
*   **Add wrapper elements**: Keep the DOM as flat as possible.
*   **Add unnecessary JavaScript**: If it can be done in CSS, do it in CSS.
*   **Hardcode values**: Always use design tokens (`--ix-*`).

### MUST
*   **Use native HTML elements** (`button`, `input`, `dialog`).
*   **Use `data-intent`** for variants (`primary`, `danger`, etc.).
*   **Use `aria-*` for state**: e.g., `aria-busy="true"` for loading, `aria-invalid="true"` for errors.
*   **Follow SRS structure**: Ensure new features align with the original specification.

---

# Testing

We use **Vitest** for automated validation. Tests ensure that components adhere to our "no-class" and "attribute-driven" rules.

```bash
# Run all tests
pnpm test
```

---

# Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(core): add alert component
fix(button): correct focus visible ring displacement
docs: update contributing guide
```

---

# Need Help?

Open an issue or start a discussion. We prefer early feedback over large, unaligned PRs.

---

# Final Note

> If something feels complex, it's probably wrong.

Keep it simple. Keep it fast. Keep it HTML.
