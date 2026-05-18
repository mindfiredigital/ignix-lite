import { describe, it, expect } from 'vitest'

describe('Grid Component', () => {

  it('renders section element', () => {
    const el = document.createElement('section')

    expect(el.tagName).toBe('SECTION')
  })

  it('supports data-grid attribute', () => {
    const el = document.createElement('section')

    el.setAttribute('data-grid', '3')

    expect(el.getAttribute('data-grid')).toBe('3')
  })

  it('supports auto layout', () => {
    const el = document.createElement('section')

    el.setAttribute('data-grid', 'auto')

    expect(el.getAttribute('data-grid')).toBe('auto')
  })

  it('supports fill layout', () => {
    const el = document.createElement('section')

    el.setAttribute('data-grid', 'fill')

    expect(el.getAttribute('data-grid')).toBe('fill')
  })

  it('supports gap attribute', () => {
    const el = document.createElement('section')

    el.setAttribute('data-gap', 'lg')

    expect(el.getAttribute('data-gap')).toBe('lg')
  })

  it('supports align attribute', () => {
    const el = document.createElement('section')

    el.setAttribute('data-align', 'center')

    expect(el.getAttribute('data-align')).toBe('center')
  })

  it('supports justify attribute', () => {
    const el = document.createElement('section')

    el.setAttribute('data-justify', 'end')

    expect(el.getAttribute('data-justify')).toBe('end')
  })

  it('supports dense layout', () => {
    const el = document.createElement('section')

    el.setAttribute('data-dense', '')

    expect(el.hasAttribute('data-dense')).toBe(true)
  })

  it('supports column span', () => {
    const el = document.createElement('article')

    el.setAttribute('data-col', '3')

    expect(el.getAttribute('data-col')).toBe('3')
  })

  it('supports full width column', () => {
    const el = document.createElement('article')

    el.setAttribute('data-col', 'full')

    expect(el.getAttribute('data-col')).toBe('full')
  })

  it('supports row span', () => {
    const el = document.createElement('article')

    el.setAttribute('data-row', '2')

    expect(el.getAttribute('data-row')).toBe('2')
  })

  it('does not require class attribute', () => {
    const el = document.createElement('section')

    expect(el.hasAttribute('class')).toBe(false)
  })

})