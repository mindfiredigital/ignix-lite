import { describe, it, expect, beforeEach } from 'vitest'
import '../packages/core/components/tab.js'

describe('ix-tabs', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ix-tabs>
        <button slot="tab">Tab 1</button>
        <button slot="tab">Tab 2</button>

        <section slot="panel">Panel 1</section>
        <section slot="panel">Panel 2</section>
      </ix-tabs>
    `
  })

  it('activates second tab on click', () => {
    const tabs = document.querySelectorAll<HTMLElement>('[slot="tab"]')
    const panels = document.querySelectorAll<HTMLElement>('[slot="panel"]')

    expect(tabs[0].getAttribute('aria-selected')).toBe('true')
    expect(panels[0].hidden).toBe(false)

    tabs[1].click()

    expect(tabs[1].getAttribute('aria-selected')).toBe('true')
    expect(tabs[0].getAttribute('aria-selected')).toBe('false')

    expect(panels[1].hidden).toBe(false)
    expect(panels[0].hidden).toBe(true)
  })

  it('moves focus with ArrowRight (no selection change)', () => {
    const tabs = document.querySelectorAll<HTMLElement>('[slot="tab"]')

    tabs[0].focus()

    tabs[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    )

  
    expect(document.activeElement).toBe(tabs[1])

  
    expect(tabs[0].getAttribute('aria-selected')).toBe('true')
  })

  it('activates tab on Enter key', () => {
    const tabs = document.querySelectorAll<HTMLElement>('[slot="tab"]')

    tabs[1].focus()

    tabs[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(tabs[1].getAttribute('aria-selected')).toBe('true')
  })
})