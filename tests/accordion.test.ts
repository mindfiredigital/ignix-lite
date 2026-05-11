import { describe, it, expect } from 'vitest'

describe('Accordion Component', () => {

  it('renders details element', () => {
    const el = document.createElement('details')
    expect(el.tagName).toBe('DETAILS')
  })

  it('renders summary element', () => {
    const el = document.createElement('summary')
    expect(el.tagName).toBe('SUMMARY')
  })

  it('supports open attribute', () => {
    const el = document.createElement('details')
    el.setAttribute('open', '')

    expect(el.hasAttribute('open')).toBe(true)
  })

  it('does not use class attribute', () => {
    const el = document.createElement('details')
    expect(el.hasAttribute('class')).toBe(false)
  })

})
