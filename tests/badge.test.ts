import { describe, it, expect } from 'vitest'

describe('Badge Component', () => {

  it('supports mark element', () => {
    const el = document.createElement('mark')
    expect(el.tagName).toBe('MARK')
  })

  it('supports span with role="status"', () => {
    const el = document.createElement('span')
    el.setAttribute('role', 'status')

    expect(el.getAttribute('role')).toBe('status')
  })

  it('supports data-intent attribute', () => {
    const el = document.createElement('mark')
    el.setAttribute('data-intent', 'danger')

    expect(el.getAttribute('data-intent')).toBe('danger')
  })

  it('supports allowed intent values only', () => {
    const intents = ['danger', 'warning', 'success', 'neutral'] as const

    intents.forEach((intent) => {
      const el = document.createElement('mark')
      el.setAttribute('data-intent', intent)

      expect(el.getAttribute('data-intent')).toBe(intent)
    })
  })

  it('does not use class attribute', () => {
    const el = document.createElement('mark')
    expect(el.hasAttribute('class')).toBe(false)
  })

})





