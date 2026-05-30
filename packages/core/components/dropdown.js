class IxDropdown extends HTMLElement {
  connectedCallback() {
    this.trigger = this.querySelector('[slot="trigger"]')
    this.menu = this.querySelector('[slot="menu"]')

    if (!this.trigger || !this.menu) return

    this._cachedItems = null
    this.items = () => {
      if (!this._cachedItems) {
        this._cachedItems = [...this.menu.querySelectorAll('button')]
      }
      return this._cachedItems
    }

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

    this._outsideClickListener = (e) => {
      if (!this.contains(e.target)) this.close()
    }
    document.addEventListener('click', this._outsideClickListener)
  }

  disconnectedCallback() {
    if (this._outsideClickListener) {
      document.removeEventListener('click', this._outsideClickListener)
    }
  }

  open() {
    this._cachedItems = [...this.menu.querySelectorAll('button')]
    this.menu.hidden = false
    this.trigger.setAttribute('aria-expanded', 'true')
  }

  close() {
    this._cachedItems = null
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
