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

    const strong = document.createElement('strong')
    strong.id = titleId
    strong.textContent = title || intent

    const span = document.createElement('span')
    span.id = msgId
    span.textContent = message

    toast.appendChild(strong)
    toast.appendChild(span)

    let durationTimeout
    let fadeTimeout

    const removeToast = () => {
      clearTimeout(durationTimeout)
      clearTimeout(fadeTimeout)
      toast.remove()
    }

    if (variant === 'action') {
      const btn = document.createElement('button')
      btn.textContent = actionText
      btn.addEventListener('click', removeToast)
      toast.appendChild(btn)
    }

    this.appendChild(toast)

    toast.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') removeToast()
    })

    requestAnimationFrame(() => {
      toast.setAttribute('data-open', 'true')
    })

    durationTimeout = setTimeout(() => {
      toast.removeAttribute('data-open')

      const onFadeEnd = () => {
        toast.removeEventListener('transitionend', onFadeEnd)
        toast.removeEventListener('animationend', onFadeEnd)
        removeToast()
      }
      toast.addEventListener('transitionend', onFadeEnd)
      toast.addEventListener('animationend', onFadeEnd)

      // Fallback in case transition fails or transitions are disabled
      fadeTimeout = setTimeout(removeToast, 400)
    }, duration)
  }
}

if (!customElements.get('ix-toast')) {
  customElements.define('ix-toast', IxToast)
}
