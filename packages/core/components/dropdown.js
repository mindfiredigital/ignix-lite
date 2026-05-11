class IxDropdown extends HTMLElement {
  connectedCallback() {
    this.trigger = this.querySelector('[slot="trigger"]')
    this.menu = this.querySelector('[slot="menu"]')

    if (!this.trigger || !this.menu) return

    this.items = () => [...this.menu.querySelectorAll('button')]

    this.trigger.setAttribute('aria-haspopup', 'menu')
    this.trigger.setAttribute('aria-expanded', 'false')

    this.menu.hidden = true

    this.trigger.addEventListener('click', () => this.toggle())

    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.open()
        this.items()[0]?.focus()
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        this.open()
        this.items()[0]?.focus()
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        this.open()
        this.items().at(-1)?.focus()
      }
    })

    this.menu.addEventListener('keydown', (e) => {
      const items = this.items()
      const index = items.indexOf(document.activeElement)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        items[(index + 1) % items.length]?.focus()
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        items[(index - 1 + items.length) % items.length]?.focus()
      }

      if (e.key === 'Escape') {
        this.close()
        this.trigger.focus()
      }
    })

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) this.close()
    })
  }

  open() {
    this.menu.hidden = false
    this.trigger.setAttribute('aria-expanded', 'true')
  }

  close() {
    this.menu.hidden = true
    this.trigger.setAttribute('aria-expanded', 'false')
  }

  toggle() {
    if (this.menu.hidden) {
      this.open()
    } else {
      this.close()
    }
  }
}

customElements.define('ix-dropdown', IxDropdown)
