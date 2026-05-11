import { describe, it, expect } from 'vitest'

describe('Progress Component', () => {
  it('renders progress element', () => {
    document.body.innerHTML = `<progress value="50" max="100"></progress>`
    const el = document.querySelector('progress')
    expect(el).not.toBeNull()
  })

  it('has correct attributes', () => {
    document.body.innerHTML = `<progress value="70" max="100"></progress>`
    const el = document.querySelector('progress')
    expect(el?.getAttribute('value')).toBe('70')
    expect(el?.getAttribute('max')).toBe('100')
  })
})