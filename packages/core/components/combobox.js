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
    this.input.setAttribute('aria-controls', 'ix-combobox-list')

    this.list.setAttribute('role', 'listbox')
    this.list.id = 'ix-combobox-list'
    this.list.hidden = true

    this.options.forEach((opt, i) => {
      opt.setAttribute('role', 'option')
      opt.setAttribute('data-index', i)
    })

    this.bindEvents()
    this.updateClear()
    this.renderChips()
  }

  bindEvents() {
    this.input.addEventListener('focus', () => this.open())
    this.input.addEventListener('input', () => this.filter())
    this.input.addEventListener('keydown', (e) => this.onKey(e))

    this.options.forEach(opt => {
      opt.addEventListener('click', () => this.select(opt))
    })

    this.clearBtn.addEventListener('mousedown', (e) => {
      e.preventDefault()
      this.clearAll()
    })

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) this.close()
    })
  }

  open() {
    this.list.hidden = false
    this.input.setAttribute('aria-expanded', 'true')
  }

  close() {
    this.list.hidden = true
    this.input.setAttribute('aria-expanded', 'false')
    this.activeIndex = -1
    this.clearActive()
  }

  filter() {
    const value = this.input.value.toLowerCase()

    this.options.forEach(opt => {
      const match = opt.textContent.toLowerCase().includes(value)
      opt.hidden = !match
    })
  }

  onKey(e) {
    const visible = this.options.filter(o => !o.hidden)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
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
      if (visible[this.activeIndex]) {
        this.select(visible[this.activeIndex])
      }
    }

    if (e.key === 'Escape' || e.key === 'Tab') {
      this.close()
    }
  }

  setActive(visible) {
    this.clearActive()
    const el = visible[this.activeIndex]
    if (el) {
      el.setAttribute('data-active', 'true')
      el.scrollIntoView({ block: 'nearest' }) 
    }
  }

  clearActive() {
    this.options.forEach(o => o.removeAttribute('data-active'))
  }

  select(opt) {
    if (this.isMultiple) {
      const isSelected = opt.hasAttribute('data-selected')
      if (isSelected) opt.removeAttribute('data-selected')
      else opt.setAttribute('data-selected', 'true')
    } else {
      this.options.forEach(o => o.removeAttribute('data-selected'))
      opt.setAttribute('data-selected', 'true')
      this.input.value = opt.textContent
      this.close()
    }

    this.updateClear()
    this.renderChips()
  }

  clearAll() {
    this.options.forEach(o => o.removeAttribute('data-selected'))
    this.input.value = ''
    this.filter()
    this.updateClear()
    this.renderChips()
  }

  removeOne(label) {
    const opt = this.options.find(o => o.textContent === label)
    if (opt) opt.removeAttribute('data-selected')
    this.updateClear()
    this.renderChips()
  }

  updateClear() {
    const hasSelection = this.options.some(o =>
      o.hasAttribute('data-selected')
    )
    this.clearBtn.style.display = hasSelection ? 'block' : 'none'
  }

  renderChips() {
    if (!this.isMultiple || !this.chips) return

    const selected = this.options
      .filter(o => o.hasAttribute('data-selected'))
      .map(o => o.textContent)

    this.chips.innerHTML = ''

    selected.forEach(text => {
      const chip = document.createElement('span')
      chip.textContent = text

      const btn = document.createElement('button')
      btn.textContent = '⨯'
      btn.setAttribute('aria-label', `Remove ${text}`)

      btn.addEventListener('mousedown', (e) => {
        e.preventDefault()
        this.removeOne(text)
      })

      chip.appendChild(btn)
      this.chips.appendChild(chip)
    })

    this.input.value = ''
  }
}

if (!customElements.get('ix-combobox')) {
  customElements.define('ix-combobox', IxCombobox)
}