import { describe, it, expect } from 'vitest'

describe('Layout Component', () => {

  it('supports data-layout primitives', () => {
    const el = document.createElement('section')

    for (const layout of [
      'app-shell',
      'box',
      'container',
      'section',
      'header',
      'stack',
      'inline',
      'cluster',
      'split',
      'center',
      'sidebar',
      'grid',
      'auto-grid',
      'masonry',
      'aspect',
      'spacer',
      'field-group',
      'form'
    ]) {
      el.setAttribute('data-layout', layout)
      expect(el.getAttribute('data-layout')).toBe(layout)
    }
  })

  it('supports responsive grid attributes', () => {
    const el = document.createElement('section')
    el.setAttribute('data-layout', 'grid')
    el.setAttribute('data-cols', '3')
    el.setAttribute('data-gap', 'md')
    el.setAttribute('data-dense', '')

    expect(el.getAttribute('data-layout')).toBe('grid')
    expect(el.getAttribute('data-cols')).toBe('3')
    expect(el.getAttribute('data-gap')).toBe('md')
    expect(el.hasAttribute('data-dense')).toBe(true)
  })

  it('supports alignment and responsive stacking', () => {
    const el = document.createElement('header')
    el.setAttribute('data-layout', 'split')
    el.setAttribute('data-align', 'center')
    el.setAttribute('data-justify', 'between')
    el.setAttribute('data-stack', 'sm')

    expect(el.getAttribute('data-align')).toBe('center')
    expect(el.getAttribute('data-justify')).toBe('between')
    expect(el.getAttribute('data-stack')).toBe('sm')
  })

  it('supports child sizing attributes', () => {
    const child = document.createElement('article')
    child.setAttribute('data-grow', '1')
    child.setAttribute('data-shrink', '0')
    child.setAttribute('data-basis', '0')
    child.setAttribute('data-span', 'full')

    expect(child.getAttribute('data-grow')).toBe('1')
    expect(child.getAttribute('data-shrink')).toBe('0')
    expect(child.getAttribute('data-basis')).toBe('0')
    expect(child.getAttribute('data-span')).toBe('full')
  })

  it('supports app shell regions and box sizing attributes', () => {
    const shell = document.createElement('div')
    const header = document.createElement('header')
    shell.setAttribute('data-layout', 'app-shell')
    header.setAttribute('data-region', 'header')

    const box = document.createElement('section')
    box.setAttribute('data-layout', 'box')
    box.setAttribute('data-width', 'md')
    box.setAttribute('data-pad', 'lg')
    box.setAttribute('data-surface', '')
    box.setAttribute('data-border', '')
    box.setAttribute('data-radius', '')

    expect(shell.getAttribute('data-layout')).toBe('app-shell')
    expect(header.getAttribute('data-region')).toBe('header')
    expect(box.getAttribute('data-width')).toBe('md')
    expect(box.getAttribute('data-pad')).toBe('lg')
    expect(box.hasAttribute('data-surface')).toBe(true)
    expect(box.hasAttribute('data-border')).toBe(true)
    expect(box.hasAttribute('data-radius')).toBe(true)
  })

  it('supports media, pin, and responsive helper attributes', () => {
    const media = document.createElement('figure')
    media.setAttribute('data-layout', 'aspect')
    media.setAttribute('data-ratio', 'video')

    const pinned = document.createElement('button')
    pinned.setAttribute('data-pin', 'fixed')
    pinned.setAttribute('data-position', 'bottom-right')
    pinned.setAttribute('data-hide', 'sm')

    expect(media.getAttribute('data-ratio')).toBe('video')
    expect(pinned.getAttribute('data-pin')).toBe('fixed')
    expect(pinned.getAttribute('data-position')).toBe('bottom-right')
    expect(pinned.getAttribute('data-hide')).toBe('sm')
  })

  it('keeps data-flex as a legacy alias', () => {
    const el = document.createElement('div')
    el.setAttribute('data-flex', 'row')

    expect(el.getAttribute('data-flex')).toBe('row')
  })

})
