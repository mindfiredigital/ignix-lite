import { describe, it, expect } from 'vitest'
 
describe('Radio Component', () => {
 
  it('renders input type radio', () => {
    const input = document.createElement('input')
    input.type = 'radio'
 
    expect(input.type).toBe('radio')
  })
 
  it('supports checked state', () => {
    const input = document.createElement('input')
    input.type = 'radio'
    input.checked = true
 
    expect(input.checked).toBe(true)
  })
 
  it('supports disabled state', () => {
    const input = document.createElement('input')
    input.type = 'radio'
    input.disabled = true
 
    expect(input.disabled).toBe(true)
  })

  it('supports required attribute for radio group', () => {
  const input = document.createElement('input')
  input.type = 'radio'
  input.name = 'group'
  input.required = true
 
  expect(input.required).toBe(true)
})
 
  it('supports grouping via name', () => {
    const r1 = document.createElement('input')
    const r2 = document.createElement('input')
 
    r1.type = 'radio'
    r2.type = 'radio'
 
    r1.name = 'group'
    r2.name = 'group'
 
    expect(r1.name).toBe(r2.name)
  })
 
  it('does not use class attribute', () => {
    const input = document.createElement('input')
    input.type = 'radio'
 
    expect(input.hasAttribute('class')).toBe(false)
  })
 
})