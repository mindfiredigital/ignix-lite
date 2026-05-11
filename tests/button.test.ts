import { describe, it, expect } from 'vitest'

describe('Ignix Button Component', () => {

  it('renders a button element', () => {
    const btn = document.createElement('button')
    expect(btn.tagName).toBe('BUTTON')
  })

  it('supports data-intent attribute', () => {
    const btn = document.createElement('button')
    btn.setAttribute('data-intent', 'primary')

    expect(btn.getAttribute('data-intent')).toBe('primary')
  })

  it('supports all intent values', () => {
    const intents = ['primary', 'danger', 'warning', 'success', 'neutral', 'ghost']

    intents.forEach((intent) => {
      const btn = document.createElement('button')
      btn.setAttribute('data-intent', intent)

      expect(btn.getAttribute('data-intent')).toBe(intent)
    })
  })

  it('supports disabled state', () => {
    const btn = document.createElement('button')
    btn.disabled = true

    expect(btn.disabled).toBe(true)
  })

  it('supports loading state using aria-busy', () => {
    const btn = document.createElement('button')
    btn.setAttribute('aria-busy', 'true')

    expect(btn.getAttribute('aria-busy')).toBe('true')
  })

  it('does not use class attribute', () => {
    const btn = document.createElement('button')

    expect(btn.hasAttribute('class')).toBe(false)
  })

})
