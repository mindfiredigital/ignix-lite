class IxToast extends HTMLElement {
  connectedCallback() {
    this.setAttribute('aria-live', 'polite')
  }

  show({
    title = '',
    message = '',
    intent = 'neutral',
    duration = 3000,
    variant = 'fade',
    actionText = 'OK'
  }) {
    const toast = document.createElement('aside')

    toast.setAttribute('role', 'status')
    toast.setAttribute(
      'aria-live',
      intent === 'danger' ? 'assertive' : 'polite'
    )

    toast.setAttribute('data-intent', intent)
    toast.setAttribute('data-variant', variant)

    const titleId = `toast-title-${Date.now()}`
    const msgId = `toast-msg-${Date.now()}`

    toast.setAttribute('aria-labelledby', titleId)
    toast.setAttribute('aria-describedby', msgId)

    toast.innerHTML = `
      <strong id="${titleId}">${title || intent}</strong>
      <span id="${msgId}">${message}</span>
    `

    if (variant === 'action') {
      const btn = document.createElement('button')
      btn.textContent = actionText

      btn.onclick = () => toast.remove()

      toast.appendChild(btn)
    }

    this.appendChild(toast)

    toast.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toast.remove()
    })

    requestAnimationFrame(() => {
      toast.setAttribute('data-open', 'true')
    })

    setTimeout(() => {
      toast.removeAttribute('data-open')
      setTimeout(() => toast.remove(), 200)
    }, duration)
  }
}

if (!customElements.get('ix-toast')) {
  customElements.define('ix-toast', IxToast)
}
