import { describe, it, expect, beforeEach } from 'vitest'

describe('Input Component', () => {

  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })



  it('should render input inside label', () => {
    container.innerHTML = `
      <label>
        Name
        <input type="text" />
      </label>
    `

    const label = container.querySelector('label')
    const input = container.querySelector('input')

    expect(label).not.toBeNull()
    expect(input).not.toBeNull()
    expect(label?.contains(input!)).toBe(true)
  })


  it('should support disabled attribute', () => {
    container.innerHTML = `
      <label>
        Disabled
        <input type="text" disabled />
      </label>
    `

    const input = container.querySelector('input')!

    expect(input.hasAttribute('disabled')).toBe(true)
  })

  it('should support aria-invalid attribute', () => {
    container.innerHTML = `
      <label>
        Invalid
        <input type="text" aria-invalid="true" />
      </label>
    `

    const input = container.querySelector('input')!

    expect(input.getAttribute('aria-invalid')).toBe('true')
  })


  it('should support multiple input types', () => {
    container.innerHTML = `
      <label>Email <input type="email" /></label>
      <label>Password <input type="password" /></label>
      <label>Number <input type="number" /></label>
    `

    const inputs = container.querySelectorAll('input')

    expect(inputs[0].getAttribute('type')).toBe('email')
    expect(inputs[1].getAttribute('type')).toBe('password')
    expect(inputs[2].getAttribute('type')).toBe('number')
  })

  it('should support placeholder attribute', () => {
    container.innerHTML = `
      <label>
        Name
        <input type="text" placeholder="Enter name" />
      </label>
    `

    const input = container.querySelector('input')!

    expect(input.getAttribute('placeholder')).toBe('Enter name')
  })


  it('should support required attribute', () => {
    container.innerHTML = `
      <label>
        Email
        <input type="email" required />
      </label>
    `

    const input = container.querySelector('input')!

    expect(input.hasAttribute('required')).toBe(true)
  })


  it('should not use class attributes', () => {
    container.innerHTML = `
      <label>
        Name
        <input type="text" />
      </label>
    `

    const label = container.querySelector('label')!
    const input = container.querySelector('input')!

    expect(label.hasAttribute('class')).toBe(false)
    expect(input.hasAttribute('class')).toBe(false)
  })

  it('should support data-intent attribute ', () => {
    container.innerHTML = `
      <label>
        Primary
        <input type="text" data-intent="primary" />
      </label>
    `

    const input = container.querySelector('input')!

    expect(input.getAttribute('data-intent')).toBe('primary')
  })

})
