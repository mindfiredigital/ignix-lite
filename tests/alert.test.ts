import { describe, it, expect, beforeEach } from 'vitest'

describe('Alert Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

 
  it('should render aside element', () => {
    container.innerHTML = `
      <aside data-intent="info">Message</aside>
    `

    const aside = container.querySelector('aside')
    expect(aside).not.toBeNull()
  })

  
  it('should support data-intent attribute', () => {
    container.innerHTML = `
      <aside data-intent="danger">Error</aside>
    `

    const aside = container.querySelector('aside')!
    expect(aside.getAttribute('data-intent')).toBe('danger')
  })

  it('should support all alert intents', () => {
    container.innerHTML = `
      <aside data-intent="danger">Error</aside>
      <aside data-intent="warning">Warning</aside>
      <aside data-intent="success">Success</aside>
      <aside data-intent="info">Info</aside>
    `

    const alerts = container.querySelectorAll('aside')

    expect(alerts[0].getAttribute('data-intent')).toBe('danger')
    expect(alerts[1].getAttribute('data-intent')).toBe('warning')
    expect(alerts[2].getAttribute('data-intent')).toBe('success')
    expect(alerts[3].getAttribute('data-intent')).toBe('info')
  })

  
  it('should render text content correctly', () => {
    container.innerHTML = `
      <aside data-intent="success">Saved successfully</aside>
    `

    const aside = container.querySelector('aside')!
    expect(aside.textContent).toContain('Saved successfully')
  })

  
  it('should not use class attribute', () => {
    container.innerHTML = `
      <aside data-intent="info">Test</aside>
    `

    const aside = container.querySelector('aside')!
    expect(aside.hasAttribute('class')).toBe(false)
  })

 
  it('should allow multiple alerts without wrapper', () => {
    container.innerHTML = `
      <aside data-intent="danger">Error</aside>
      <aside data-intent="warning">Warning</aside>
    `

    const alerts = container.querySelectorAll('aside')
    expect(alerts.length).toBe(2)
  })

})
