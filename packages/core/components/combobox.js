class IxCombobox extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input')
    this.list = this.querySelector('ul')
    this.options = Array.from(this.querySelectorAll('li'))
    this.clearBtn = this.querySelector('[data-clear]')
    this.chips = this.querySelector('[data-chips]')
    this.isMultiple = this.hasAttribute('multiple')
    this.activeIndex = -1
    this.input.setAttribute('role', 'combobox')
    this.input.setAttribute('aria-expanded', 'false')
    this.input.setAttribute('aria-autocomplete', 'list')

    this.list.id = 'ix-combobox-list'
    this.input.setAttribute('aria-controls', this.list.id)
    this.list.hidden = true

    this.options.forEach((opt, i) => {
      opt.id = `ix-option-${i}`
      opt.setAttribute('role', 'option')
    })

    this.clearBtn.hidden = true
    this.bindEvents()
    this.renderChips()
  }

  bindEvents() {
    this.input.addEventListener('focus', () => this.open())
    this.input.addEventListener('input', () => {
      this.filter()
      this.open()
    })

    this.input.addEventListener('keydown', (e) => this.onKey(e))
    this.options.forEach((opt) =>
      opt.addEventListener('click', () => this.select(opt))
    )

    this.clearBtn.addEventListener('mousedown', (e) => {
      e.preventDefault()
      this.clearAll()
    })

    this._outsideClickListener = (e) => {
      if (!this.contains(e.target)) {
        this.close()
      }
    }
    document.addEventListener('click', this._outsideClickListener)

    if (this.chips) {
      this.chips.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('button')
        if (btn && btn._option) {
          e.preventDefault()
          btn._option.removeAttribute('data-selected')
          this.renderChips()
          this.updateClear()
        }
      })
    }
  }

  disconnectedCallback() {
    if (this._outsideClickListener) {
      document.removeEventListener('click', this._outsideClickListener)
    }
  }

  open() {
    this.list.hidden = false
    this.input.setAttribute('aria-expanded', 'true')
  }

  close() {
    this.list.hidden = true
    this.activeIndex = -1
    this.input.setAttribute('aria-expanded', 'false')
    this.clearActive()
  }

  filter() {
    const value = this.input.value.toLowerCase()
    this.options.forEach((opt) => {
      opt.hidden = !opt.textContent.toLowerCase().includes(value)
    })
  }

  onKey(e) {
    const visible = this.options.filter((o) => !o.hidden)
    if (!visible.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.open()
      this.activeIndex = (this.activeIndex + 1) % visible.length
      this.setActive(visible)
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.activeIndex =
        (this.activeIndex - 1 + visible.length) % visible.length
      this.setActive(visible)
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const el = visible[this.activeIndex]
      if (el) this.select(el)
    }

    if (e.key === 'Escape') {
      this.close()
    }

    if (e.key === 'Tab') {
      this.close()
    }
  }

  setActive(visible) {
    this.clearActive()
    const el = visible[this.activeIndex]
    if (!el) return
    el.setAttribute('data-active', 'true')
    this.input.setAttribute('aria-activedescendant', el.id)
    el.scrollIntoView({
      block: 'nearest'
    })
  }

  clearActive() {
    this.options.forEach((o) => o.removeAttribute('data-active'))
  }

  select(opt) {
    if (this.isMultiple) {
      opt.toggleAttribute('data-selected')
      this.renderChips()
    } else {
      this.options.forEach((o) => o.removeAttribute('data-selected'))
      opt.setAttribute('data-selected', 'true')
      this.input.value = opt.textContent
      this.close()
    }

    this.updateClear()
  }

  clearAll() {
    this.options.forEach((o) => o.removeAttribute('data-selected'))
    this.input.value = ''
    this.renderChips()
    this.updateClear()
    this.close()
  }

  updateClear() {
    const selected = this.options.some((o) => o.hasAttribute('data-selected'))
    this.clearBtn.hidden = !selected
  }

  renderChips() {
    if (!this.isMultiple || !this.chips) return
    this.chips.innerHTML = ''

    this.options
      .filter((o) => o.hasAttribute('data-selected'))
      .forEach((opt) => {
        const chip = document.createElement('span')
        chip.textContent = opt.textContent
        const btn = document.createElement('button')
        btn.innerHTML = '&times;'
        btn._option = opt

        chip.append(btn)
        this.chips.append(chip)
      })
  }
}

customElements.define('ix-combobox', IxCombobox)
