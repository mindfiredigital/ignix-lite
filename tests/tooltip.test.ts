import { describe, it, expect, beforeAll } from 'vitest'
import '../packages/core/components/tooltip';

describe('IxTooltip Component', () => {

  beforeAll(() => {
   
    document.body.innerHTML = ''
  })

  it('renders tooltip element', () => {
    const el = document.createElement('ix-tooltip')
    expect(el.tagName).toBe('IX-TOOLTIP')
  })

  it('supports content attribute', () => {
    const el = document.createElement('ix-tooltip')
    el.setAttribute('content', 'Hello')

    expect(el.getAttribute('content')).toBe('Hello')
  })

  it('supports position attribute', () => {
    const el = document.createElement('ix-tooltip')
    el.setAttribute('position', 'bottom')

    expect(el.getAttribute('position')).toBe('bottom')
  })

  it('supports intent attribute', () => {
    const el = document.createElement('ix-tooltip')
    el.setAttribute('data-intent', 'danger')

    expect(el.getAttribute('data-intent')).toBe('danger')
  })

  it('adds tabindex for accessibility', () => {
    const el = document.createElement('ix-tooltip')

    document.body.appendChild(el)

    
    expect(el.tabIndex).toBe(0)
  })

  it('sets role tooltip', () => {
    const el = document.createElement('ix-tooltip')

    document.body.appendChild(el)

    expect(el.getAttribute('role')).toBe('tooltip')
  })

})
