import { describe, it, expect, beforeEach } from 'vitest'

describe('Textarea Component', () => {

  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })


  it('should render textarea inside label', () => {
    container.innerHTML = `
      <label>
        Message
        <textarea></textarea>
      </label>
    `

    const label = container.querySelector('label')
    const textarea = container.querySelector('textarea')

    expect(label).not.toBeNull()
    expect(textarea).not.toBeNull()
    expect(label?.contains(textarea!)).toBe(true)
  })


  it('should support rows attribute', () => {
    container.innerHTML = `
      <label>
        Message
        <textarea rows="5"></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.getAttribute('rows')).toBe('5')
  })


  it('should support disabled attribute', () => {
    container.innerHTML = `
      <label>
        Disabled
        <textarea disabled></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.hasAttribute('disabled')).toBe(true)
  })


  it('should support aria-invalid attribute', () => {
    container.innerHTML = `
      <label>
        Invalid
        <textarea aria-invalid="true"></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.getAttribute('aria-invalid')).toBe('true')
  })


  it('should support required attribute', () => {
    container.innerHTML = `
      <label>
        Required
        <textarea required></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.hasAttribute('required')).toBe(true)
  })


  it('should support placeholder attribute', () => {
    container.innerHTML = `
      <label>
        Message
        <textarea placeholder="Enter message"></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.getAttribute('placeholder')).toBe('Enter message')
  })


  it('should support data-intent attribute', () => {
    container.innerHTML = `
      <label>
        Primary
        <textarea data-intent="primary"></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    expect(textarea.getAttribute('data-intent')).toBe('primary')
  })


  it('should not use class attributes', () => {
    container.innerHTML = `
      <label>
        Message
        <textarea></textarea>
      </label>
    `

    const label = container.querySelector('label')!
    const textarea = container.querySelector('textarea')!

    expect(label.hasAttribute('class')).toBe(false)
    expect(textarea.hasAttribute('class')).toBe(false)
  })


  it('should allow value input', () => {
    container.innerHTML = `
      <label>
        Message
        <textarea></textarea>
      </label>
    `

    const textarea = container.querySelector('textarea')!

    textarea.value = 'Hello world'

    expect(textarea.value).toBe('Hello world')
  })

})
