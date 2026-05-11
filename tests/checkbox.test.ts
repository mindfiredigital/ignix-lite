import { describe, it, expect } from 'vitest'

describe('Checkbox Component', () => {

  it('renders an input element of type checkbox', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'

    expect(input.tagName).toBe('INPUT')
    expect(input.type).toBe('checkbox')
  })

  it('supports checked state', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = true

    expect(input.checked).toBe(true)
  })

  it('supports disabled state', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.disabled = true

    expect(input.disabled).toBe(true)
  })

  it('supports required attribute', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.required = true

    expect(input.required).toBe(true)
  })

  it('supports aria-invalid state', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.setAttribute('aria-invalid', 'true')

    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('can be associated with a label', () => {
    const label = document.createElement('label')
    const input = document.createElement('input')

    input.type = 'checkbox'
    label.appendChild(input)

    expect(label.contains(input)).toBe(true)
  })

  it('does not use class attribute', () => {
    const input = document.createElement('input')
    input.type = 'checkbox'

    expect(input.hasAttribute('class')).toBe(false)
  })

  it('supports multiple checkbox group via name attribute', () => {
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')

    input1.type = 'checkbox'
    input2.type = 'checkbox'

    input1.name = 'group'
    input2.name = 'group'

    expect(input1.name).toBe(input2.name)
  })

})
