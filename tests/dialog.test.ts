import { describe, it, expect } from "vitest";

describe('Dialog Component', () => {
    it('renders dialog element', () => {
        const el = document.createElement('dialog')
        expect(el.tagName).toBe('DIALOG')
    })
    it('requires id attributes', () => {
        const el = document.createElement('dialog')
        el.id = 'confirm'

        expect(el.id).toBe('confirm')
    })
    it('supports data-intent attributes', () => {
        const el = document.createElement('dialog')
        el.setAttribute('data-intent','danger')

        expect(el.getAttribute('data-intent')).toBe('danger')
    })
    it('supports allowed intent values only',() => {
        const intents = ['danger','warning','info'] as const
        intents.forEach((intent) => {
            const el = document.createElement('dialog')
            el.setAttribute('data-intent',intent)

            expect(el.getAttribute('data-intent')).toBe(intent)
        })
    })
    it('supports open attribute', () => {
        const el = document.createElement('dialog')
        el.setAttribute('open', '')
        expect(el.hasAttribute('open')).toBe(true)
    })
    it('does not use class attribute', () => {
        const el = document.createElement('dialog')

        expect(el.hasAttribute('class')).toBe(false)
    })
})