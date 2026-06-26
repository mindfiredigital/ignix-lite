import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Layout Component', () => {
  beforeAll(() => {
    const cssPath = path.resolve(process.cwd(), 'packages/core/ignix-lite.min.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('supports data-layout primitives', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // Stack layout
    el.setAttribute('data-layout', 'stack')
    let styles = window.getComputedStyle(el)
    expect(styles.display).toBe('flex')
    expect(styles.flexDirection).toBe('column')

    // Inline layout
    el.setAttribute('data-layout', 'inline')
    styles = window.getComputedStyle(el)
    expect(styles.display).toBe('flex')
    expect(styles.flexDirection).toBe('row')

    // Center layout
    el.setAttribute('data-layout', 'center')
    styles = window.getComputedStyle(el)
    expect(styles.display).toBe('grid')
    expect(styles.getPropertyValue('place-items') || styles.placeItems || styles.alignItems).toBe('center')

    // Split layout
    el.setAttribute('data-layout', 'split')
    styles = window.getComputedStyle(el)
    expect(styles.display).toBe('flex')
    expect(styles.justifyContent).toBe('space-between')

    // Grid layout
    el.setAttribute('data-layout', 'grid')
    styles = window.getComputedStyle(el)
    expect(styles.display).toBe('grid')
  })

  it('supports responsive grid attributes', () => {
    const el = document.createElement('div')
    el.setAttribute('data-layout', 'grid')
    el.setAttribute('data-cols', '3')
    el.setAttribute('data-gap', 'md')
    el.setAttribute('data-dense', '')
    document.body.appendChild(el)

    const styles = window.getComputedStyle(el)
    expect(styles.display).toBe('grid')
    expect(styles.getPropertyValue('--ix-grid-columns')).toBe('3')
    expect(styles.getPropertyValue('gap') || styles.gap).toContain('var(--ix-space-md)')
    expect(styles.getPropertyValue('grid-auto-flow') || styles.gridAutoFlow).toBe('dense')
  })

  it('supports alignment and responsive stacking', () => {
    const el = document.createElement('div')
    el.setAttribute('data-layout', 'split')
    el.setAttribute('data-align', 'center')
    el.setAttribute('data-justify', 'between')
    document.body.appendChild(el)

    const styles = window.getComputedStyle(el)
    expect(styles.display).toBe('flex')
    expect(styles.alignItems).toBe('center')
    expect(styles.justifyContent).toBe('space-between')
  })

  it('supports child sizing attributes', () => {
    const parent = document.createElement('div')
    parent.setAttribute('data-layout', 'stack')
    const child = document.createElement('div')
    child.setAttribute('data-grow', '1')
    child.setAttribute('data-shrink', '0')
    parent.appendChild(child)
    document.body.appendChild(parent)

    const styles = window.getComputedStyle(child)
    expect(styles.getPropertyValue('flex-grow') || styles.flexGrow).toBe('1')
    expect(styles.getPropertyValue('flex-shrink') || styles.flexShrink).toBe('0')
  })

  it('supports app shell regions and box sizing attributes', () => {
    const shell = document.createElement('div')
    shell.setAttribute('data-layout', 'app-shell')
    const header = document.createElement('header')
    header.setAttribute('data-region', 'header')
    shell.appendChild(header)
    document.body.appendChild(shell)

    let styles = window.getComputedStyle(shell)
    expect(styles.display).toBe('grid')
    expect(styles.gridTemplateAreas).toContain('header')

    const box = document.createElement('div')
    box.setAttribute('data-layout', 'box')
    box.setAttribute('data-width', 'md')
    box.setAttribute('data-pad', 'lg')
    box.setAttribute('data-surface', '')
    box.setAttribute('data-border', '')
    box.setAttribute('data-radius', '')
    document.body.appendChild(box)

    styles = window.getComputedStyle(box)
    expect(styles.getPropertyValue('--ix-box-width')).toBe('32rem')
    expect(styles.getPropertyValue('--ix-box-padding')).toBe('var(--ix-space-lg)')
  })

  it('supports media, pin, and responsive helper attributes', () => {
    const media = document.createElement('div')
    media.setAttribute('data-layout', 'aspect')
    media.setAttribute('data-ratio', 'video')
    document.body.appendChild(media)

    let styles = window.getComputedStyle(media)
    expect(styles.getPropertyValue('--ix-aspect-ratio')).toBe('16/9')

    const pinned = document.createElement('div')
    pinned.setAttribute('data-pin', 'fixed')
    pinned.setAttribute('data-position', 'bottom-right')
    document.body.appendChild(pinned)

    styles = window.getComputedStyle(pinned)
    expect(styles.position).toBe('fixed')
  })

  it('keeps data-flex as a legacy alias', () => {
    const el = document.createElement('div')
    el.setAttribute('data-flex', 'row')
    document.body.appendChild(el)

    const styles = window.getComputedStyle(el)
    expect(styles.display).toBe('flex')
    expect(styles.flexDirection).toBe('row')
  })
})
