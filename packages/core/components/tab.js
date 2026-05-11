class IxTabs extends HTMLElement {
  connectedCallback() {
    this.tabs = [...this.querySelectorAll('[slot="tab"]')]
    this.panels = [...this.querySelectorAll('[slot="panel"]')]

    this.setAttribute('role', 'tablist')

    this.tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab')
      tab.setAttribute('tabindex', '0')
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false')

      tab.addEventListener('click', () => this.select(i))

      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          this.tabs[(i + 1) % this.tabs.length].focus()
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          this.tabs[(i - 1 + this.tabs.length) % this.tabs.length].focus()
        }

        if (e.key === 'Tab') {
          if (!e.shiftKey) {
            if (i < this.tabs.length - 1) {
              e.preventDefault()
              this.tabs[i + 1].focus()
            }
          } else {
            if (i > 0) {
              e.preventDefault()
              this.tabs[i - 1].focus()
            }
          }
        }

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.select(i)
        }
      })
    })

    this.panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel')
      panel.hidden = i !== 0
    })

    this.select(0)
  }

  select(index) {
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false')
    })

    this.panels.forEach((panel, i) => {
      panel.hidden = i !== index
    })
  }
}

if (!customElements.get('ix-tabs')) {
  customElements.define('ix-tabs', IxTabs)
}
