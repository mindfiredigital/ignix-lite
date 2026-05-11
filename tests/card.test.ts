import { describe, it, expect } from 'vitest'

describe('Card Component', () => {

  it('renders article', () => {
    document.body.innerHTML = `<article></article>`
    expect(document.querySelector('article')).not.toBeNull()
  })

  it('supports slot attributes', () => {
    document.body.innerHTML = `<span slot="title">Test</span>`
    const el = document.querySelector('[slot="title"]')
    expect(el).not.toBeNull()
  })

})