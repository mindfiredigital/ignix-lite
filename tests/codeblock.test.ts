import { describe, it, expect } from 'vitest'

describe('code block', () => {

  it('renders pre and code', () => {
    document.body.innerHTML = `<pre><code data-lang="js">test</code></pre>`
    expect(document.querySelector('pre')).not.toBeNull()
    expect(document.querySelector('code')).not.toBeNull()
  })

  it('supports data-lang', () => {
    document.body.innerHTML = `<code data-lang="js"></code>`
    const el = document.querySelector('code')
    expect(el?.getAttribute('data-lang')).toBe('js')
  })

})