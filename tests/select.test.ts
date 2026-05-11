import { describe, it, expect, beforeEach } from 'vitest'

describe('Select Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  it('should render select inside label', () => {
    container.innerHTML = `
      <label>
        Country
        <select>
          <option value="in">India</option>
        </select>
      </label>
    `

    const label = container.querySelector('label')
    const select = container.querySelector('select')

    expect(label).not.toBeNull()
    expect(select).not.toBeNull()
    expect(label?.contains(select!)).toBe(true)
  })

  it('should support disabled attribute', () => {
    container.innerHTML = `
      <label>
        Country
        <select disabled></select>
      </label>
    `

    const select = container.querySelector('select')!
    expect(select.hasAttribute('disabled')).toBe(true)
  })

  it('should support required attribute', () => {
    container.innerHTML = `
      <label>
        Country
        <select required></select>
      </label>
    `

    const select = container.querySelector('select')!
    expect(select.hasAttribute('required')).toBe(true)
  })

  it('should support multiple attribute', () => {
    container.innerHTML = `
      <label>
        Country
        <select multiple></select>
      </label>
    `

    const select = container.querySelector('select')!
    expect(select.hasAttribute('multiple')).toBe(true)
  })

  it('should not use class attribute', () => {
    container.innerHTML = `
      <label>
        Country
        <select></select>
      </label>
    `

    const label = container.querySelector('label')!
    const select = container.querySelector('select')!

    expect(label.hasAttribute('class')).toBe(false)
    expect(select.hasAttribute('class')).toBe(false)
  })

  it('should render options correctly', () => {
    container.innerHTML = `
      <label>
        Country
        <select>
          <option value="in">India</option>
          <option value="us">USA</option>
        </select>
      </label>
    `

    const options = container.querySelectorAll('option')
    expect(options.length).toBe(2)
    expect(options[0].textContent).toBe('India')
  })
})



