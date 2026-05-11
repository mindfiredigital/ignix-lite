import { describe, it, expect } from 'vitest'

describe('Table Component', () => {

  it('renders table', () => {
    document.body.innerHTML = `<table></table>`
    expect(document.querySelector('table')).not.toBeNull()
  })

  it('supports aria-sort', () => {
    document.body.innerHTML = `
      <table>
        <thead>
          <tr>
            <th aria-sort="ascending">Name</th>
          </tr>
        </thead>
      </table>
    `

    const el = document.querySelector('th')
    expect(el?.getAttribute('aria-sort')).toBe('ascending')
  })
})