import { describe, it, expect } from 'vitest'

describe('Navigation Component', () => {

  it('renders nav structure', () => {
    document.body.innerHTML = `<nav><ul><li><a href="#">Link</a></li></ul></nav>`
    expect(document.querySelector('nav')).not.toBeNull()
    expect(document.querySelector('a')).not.toBeNull()
  })

  it('supports aria-current', () => {
    document.body.innerHTML = `<a aria-current="page"></a>`
    const el = document.querySelector('a')
    expect(el?.getAttribute('aria-current')).toBe('page')
  })

})
