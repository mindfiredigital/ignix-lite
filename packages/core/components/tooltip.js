class IxTooltip extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tooltip')
    }
    const trigger = this.querySelector('button, a, input, select, textarea, [tabindex="0"]')
    if (!trigger) return

    const content = this.getAttribute('content')
    if (!content) return

    // Generate a unique ID for the accessible tooltip node
    const tooltipId = `ix-tooltip-content-${Math.random().toString(36).substring(2, 9)}`

    // Create a visually hidden element containing the tooltip text
    const tooltipEl = document.createElement('span')
    tooltipEl.id = tooltipId
    tooltipEl.setAttribute('role', 'tooltip')
    
    // Position out of visual flow but visible to screen readers
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.width = '1px'
    tooltipEl.style.height = '1px'
    tooltipEl.style.padding = '0'
    tooltipEl.style.margin = '-1px'
    tooltipEl.style.overflow = 'hidden'
    tooltipEl.style.clip = 'rect(0, 0, 0, 0)'
    tooltipEl.style.whiteSpace = 'nowrap'
    tooltipEl.style.border = '0'
    tooltipEl.textContent = content

    this.appendChild(tooltipEl)
    trigger.setAttribute('aria-describedby', tooltipId)
  }
}

if (!customElements.get('ix-tooltip')) {
  customElements.define('ix-tooltip', IxTooltip)
}
