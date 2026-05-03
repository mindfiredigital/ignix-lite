class IxTooltip extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tooltip')
    }
  }
}

if (!customElements.get('ix-tooltip')) {
  customElements.define('ix-tooltip', IxTooltip)
}
