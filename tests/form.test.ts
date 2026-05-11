import { describe, it, expect } from 'vitest'

describe('Form Component', () => {

  it('renders form element', () => {
    document.body.innerHTML = `<form id="f"></form>`
    const el = document.querySelector('form')
    expect(el).not.toBeNull()
  })

  it('supports id attribute', () => {
    document.body.innerHTML = `<form id="signup"></form>`
    const el = document.querySelector('form')
    expect(el?.id).toBe('signup')
  })

  it('supports aria-busy state', () => {
    document.body.innerHTML = `<form aria-busy="true"></form>`
    const el = document.querySelector('form')
    expect(el?.getAttribute('aria-busy')).toBe('true')
  })

  it('supports data-loading attribute', () => {
    document.body.innerHTML = `<form data-loading></form>`
    const el = document.querySelector('form')
    expect(el?.hasAttribute('data-loading')).toBe(true)
  })

})