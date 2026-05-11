import { describe, it, expect } from 'vitest'

describe('Divider Component', () => {
  it('renders hr element', () => {
    document.body.innerHTML = `<hr>`
    const el = document.querySelector('hr')
    expect(el).not.toBeNull()
  })

  it('supports vertical orientation', () => {
    document.body.innerHTML = `<hr data-orientation="vertical">`
    const el = document.querySelector('hr')
    expect(el?.getAttribute('data-orientation')).toBe('vertical')
  })
})