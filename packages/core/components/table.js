class IxTable extends HTMLTableElement {
  connectedCallback() {
    const headers = this.querySelectorAll('th[data-sortable]')

    headers.forEach((header) => {
      header.tabIndex = 0
    })

    this._tableClickListener = (event) => {
      const header = event.target.closest('th[data-sortable]')
      if (header && this.contains(header)) {
        this.sortColumn(header)
      }
    }

    this._tableKeydownListener = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const header = event.target.closest('th[data-sortable]')
        if (header && this.contains(header)) {
          event.preventDefault()
          this.sortColumn(header)
        }
      }
    }

    this.addEventListener('click', this._tableClickListener)
    this.addEventListener('keydown', this._tableKeydownListener)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._tableClickListener)
    this.removeEventListener('keydown', this._tableKeydownListener)
  }

  sortColumn(header) {
    const tbody = this.querySelector('tbody')

    if (!tbody) return

    const rows = Array.from(tbody.querySelectorAll('tr'))
    const columnIndex = Array.from(header.parentElement.children).indexOf(
      header
    )
    const ascending = header.getAttribute('aria-sort') !== 'ascending'
    this.querySelectorAll('th').forEach((th) => th.removeAttribute('aria-sort'))
    header.setAttribute('aria-sort', ascending ? 'ascending' : 'descending')

    rows.sort((a, b) => {
      const A = a.children[columnIndex]?.textContent?.trim() || ''
      const B = b.children[columnIndex]?.textContent?.trim() || ''
      const numA = Number(A)
      const numB = Number(B)
      const numeric = !Number.isNaN(numA) && !Number.isNaN(numB)
      if (numeric) {
        return ascending ? numA - numB : numB - numA
      }

      return ascending ? A.localeCompare(B) : B.localeCompare(A)
    })

    tbody.replaceChildren(...rows)
  }
}

customElements.define('ix-table', IxTable, { extends: 'table' })
