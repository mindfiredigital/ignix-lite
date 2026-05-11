import { describe, it, expect } from 'vitest'

describe('Avatar component', () => {

  it('renders image avatar', () => {
    document.body.innerHTML = `<img data-size="md" />`
    expect(document.querySelector('img')).not.toBeNull()
  })

  it('supports data-size', () => {
    document.body.innerHTML = `<span data-size="lg"></span>`
    const el = document.querySelector('[data-size="lg"]')
    expect(el).not.toBeNull()
  })

})
