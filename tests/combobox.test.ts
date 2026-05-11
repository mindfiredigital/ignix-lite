import { describe, it, expect, beforeEach } from 'vitest'
import '../packages/core/components/combobox.js'

describe('ix-combobox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ix-combobox>
        <label part="control">
          <input />
          <button data-clear>Clear</button>
        </label>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </ix-combobox>
    `
  })

  it('opens on focus', () => {
    const combo = document.querySelector('ix-combobox')!
    const input = combo.querySelector('input')!

    input.focus()

    const list = combo.querySelector('ul')!
    expect(list.hidden).toBe(false)
  })

  it('filters options', () => {
    const combo = document.querySelector('ix-combobox')!
    const input = combo.querySelector('input')!

    input.value = 'app'
    input.dispatchEvent(new Event('input'))

    const items = combo.querySelectorAll('li')

    expect(items[0].hidden).toBe(false)
    expect(items[1].hidden).toBe(true)
  })

  it('selects item on click', () => {
    const combo = document.querySelector('ix-combobox')!
    const input = combo.querySelector('input')!
    const item = combo.querySelector('li')!

    item.click()

    expect(input.value).toBe('Apple')
  })

  it('closes on outside click', () => {
    const combo = document.querySelector('ix-combobox')!
    const input = combo.querySelector('input')!

    input.focus()


    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const list = combo.querySelector('ul')!
    expect(list.hidden).toBe(true)
  })
})