import { describe, it, expect, beforeEach } from 'vitest'
import '../packages/core/components/toast.js'

interface IxToastElement extends HTMLElement {
  show: (options: {
    title?: string
    message: string
    intent?: string
    variant?: string
    duration?: number
  }) => void
}

describe('ix-toast', () => {
  beforeEach(() => {
    document.body.innerHTML = `<ix-toast id="toast"></ix-toast>`
  })

it('renders toast message', () => {
  const toast = document.querySelector('ix-toast') as IxToastElement

  expect(toast).not.toBeNull()

  toast.show({ message: 'Hello' })

  const item = toast.querySelector('aside') as HTMLElement
  const message = item.querySelector('span') as HTMLElement

  expect(item).not.toBeNull()
  expect(message).not.toBeNull()
  expect(message.textContent).toBe('Hello')
})

  it('applies intent correctly', () => {
    const toast = document.querySelector('ix-toast') as IxToastElement

    toast.show({ message: 'Danger', intent: 'danger' })

    const item = toast.querySelector('aside') as HTMLElement

    expect(item.getAttribute('data-intent')).toBe('danger')
  })

  it('applies variant correctly', () => {
    const toast = document.querySelector('ix-toast') as IxToastElement

    toast.show({ message: 'Slide', variant: 'slide' })

    const item = toast.querySelector('aside') as HTMLElement

    expect(item.getAttribute('data-variant')).toBe('slide')
  })
})