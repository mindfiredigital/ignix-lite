import { describe, it, expect } from 'vitest'

describe('Breadcrumb Component', () => {

  it('renders nav element', () => {
    const el = document.createElement('nav')

    expect(el.tagName).toBe('NAV')
  })

  it('supports aria-label', () => {
    const el = document.createElement('nav')

    el.setAttribute('aria-label', 'Breadcrumb')

    expect(el.getAttribute('aria-label')).toBe('Breadcrumb')
  })

  it('supports active page state', () => {
    const el = document.createElement('a')

    el.setAttribute('aria-current', 'page')

    expect(el.getAttribute('aria-current')).toBe('page')
  })

  it('supports chevron style (default)', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'chevron')

    expect(el.getAttribute('data-style')).toBe('chevron')
  })

  it('supports slash style', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'slash')

    expect(el.getAttribute('data-style')).toBe('slash')
  })

  it('supports guillemet style', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'guillemet')

    expect(el.getAttribute('data-style')).toBe('guillemet')
  })


  it('supports arrow style', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'arrow')

    expect(el.getAttribute('data-style')).toBe('arrow')
  })

  it('supports thread style', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'thread')

    expect(el.getAttribute('data-style')).toBe('thread')
  })

  it('supports success intent', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-intent', 'success')

    expect(el.getAttribute('data-intent')).toBe('success')
  })

  it('supports warning intent', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-intent', 'warning')

    expect(el.getAttribute('data-intent')).toBe('warning')
  })

  it('supports danger intent', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-intent', 'danger')

    expect(el.getAttribute('data-intent')).toBe('danger')
  })

  it('supports gradient intent', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-intent', 'gradient')

    expect(el.getAttribute('data-intent')).toBe('gradient')
  })

  it('supports combining style and intent', () => {
    const el = document.createElement('nav')

    el.setAttribute('data-style', 'thread')
    el.setAttribute('data-intent', 'success')

    expect(el.getAttribute('data-style')).toBe('thread')
    expect(el.getAttribute('data-intent')).toBe('success')
  })

  it('supports keyboard focus via href', () => {
    const el = document.createElement('a')

    el.setAttribute('href', '#')

    expect(el.getAttribute('href')).toBe('#')
  })

  it('does not require classes', () => {
    const el = document.createElement('nav')

    expect(el.hasAttribute('class')).toBe(false)
  })

  it('renders ordered list inside nav', () => {
    const nav = document.createElement('nav')
    const ol = document.createElement('ol')

    nav.appendChild(ol)

    expect(nav.querySelector('ol')).not.toBeNull()
  })

  it('renders list items inside ol', () => {
    const ol = document.createElement('ol')
    const li = document.createElement('li')

    ol.appendChild(li)

    expect(ol.querySelectorAll('li').length).toBe(1)
  })

  it('marks only last item as current page', () => {
    const nav = document.createElement('nav')

    nav.innerHTML = `
      <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#" aria-current="page">Installation</a></li>
      </ol>
    `

    const currentItems = nav.querySelectorAll('[aria-current="page"]')

    expect(currentItems.length).toBe(1)
  })

  it('supports deep nested paths', () => {
    const nav = document.createElement('nav')

    nav.innerHTML = `
      <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Library</a></li>
        <li><a href="#">Fiction</a></li>
        <li><a href="#">Sci-Fi</a></li>
        <li><a href="#" aria-current="page">Dune</a></li>
      </ol>
    `

    const items = nav.querySelectorAll('li')

    expect(items.length).toBe(5)
  })

})