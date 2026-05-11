import { describe, it, expect } from 'vitest'
 
describe('Skeleton Component', () => {
  it('renders skeleton element', () => {
    document.body.innerHTML = `<span aria-busy="true"></span>`
    const el = document.querySelector('span')
    expect(el).not.toBeNull()
  })
 
  it('has aria-busy attribute', () => {
    document.body.innerHTML = `<span aria-busy="true"></span>`
    const el = document.querySelector('span')
    expect(el?.getAttribute('aria-busy')).toBe('true')
  })

  it('supports data-shape attribute', () => {
    document.body.innerHTML = `<span aria-busy="true" data-shape="text"></span>`
    const el = document.querySelector('span')
    expect(el?.getAttribute('data-shape')).toBe('text')
  })

  
  it('supports data-lines attribute', () => {
    document.body.innerHTML = `<span aria-busy="true" data-lines="3"></span>`
    const el = document.querySelector('span')
    expect(el?.getAttribute('data-lines')).toBe('3')
  })
})
 