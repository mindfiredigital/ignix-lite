import { describe, it, expect } from 'vitest'

describe('Meter Component', () => {
  it('renders meter element', () => {
    document.body.innerHTML = `<meter value="20" min="0" max="100" low="30" high="70" optimum="100"></meter>`
    const el = document.querySelector('meter')
    expect(el).not.toBeNull()
  })

  it('has correct attributes', () => {
    document.body.innerHTML = `<meter value="80" min="0" max="100" low="30" high="70" optimum="100"></meter>`
    const el = document.querySelector('meter')
    expect(el?.getAttribute('value')).toBe('80')
    expect(el?.getAttribute('max')).toBe('100')
  })
})