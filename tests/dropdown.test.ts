import { describe, it, expect, beforeEach } from 'vitest'
import '../packages/core/components/dropdown.js'

describe('ix-dropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ix-dropdown>
        <button slot="trigger">Open</button>
        <div slot="menu">
          <div>Item</div>
        </div>
      </ix-dropdown>
    `
  })

  it('opens on click', () => {
    const trigger = document.querySelector('[slot="trigger"]') as HTMLElement
    const menu = document.querySelector('[slot="menu"]') as HTMLElement

    expect(menu.hidden).toBe(true)

    trigger.click()

    expect(menu.hidden).toBe(false)
  })

  it('closes on outside click', () => {
    const trigger = document.querySelector('[slot="trigger"]') as HTMLElement
    const menu = document.querySelector('[slot="menu"]') as HTMLElement

    trigger.click()
    document.body.click()

    expect(menu.hidden).toBe(true)
  })

  it('toggles with keyboard', () => {
    const trigger = document.querySelector('[slot="trigger"]') as HTMLElement
    const menu = document.querySelector('[slot="menu"]') as HTMLElement

    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(menu.hidden).toBe(false)
  })
})