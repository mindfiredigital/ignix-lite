import pc from 'picocolors'

const COMPONENT_TEMPLATES: Record<string, string> = {
  accordion: `<details>
                    <summary>Accordion Title</summary>
                    <p>Accordion contents goes here...</p>
                </details>`,
  alert: `<aside data-intent="info">
                <strong>Head's up!</strong>
                <span>This is a semantic alert component</span>
            </aside>`,
  avatar: `<span data-size="md">JD</span>`,
  badge: `<mark data-intent="success">Saved</mark>`,
  breadcrumb: `<nav aria-label="Breadcrumb">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li><a href="/docs" aria-current="page">Docs</a></li>
                    </ol>
                </nav>`,
  button: `<button data-intent="primary">Save</button>`,
  card: `<article>
            <h2 slot="title">Card Title</h2>
            <p slot="body">
                This is the main card body content.
            </p>
        </article>`,
  checkbox: `<label>
                <input type="checkbox" />
                Remember me
            </label>`,
  codeblock: `<pre><code data-lang="typescript">const greet = () => "Hello World";</code></pre>`,
  combobox: `<ix-combobox>
                    <label slot="control">
                        Search
                        <input type="text" placeholder="Search options..." />
                    </label>
                    <ul hidden>
                        <li data-value="1">Option A</li>
                        <li data-value="2">Option B</li>
                    </ul>
                </ix-combobox>`,
  dialog: `<dialog id="confirm-modal" data-intent="danger">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to proceed?</p>
                <button>Cancel</button>
                <button>Delete</button>
            </dialog>`,
  divider: `<hr />`,
  dropdown: `<ix-dropdown>
                <button slot="trigger">Options ▾</button>
                <ul slot="menu" hidden>
                    <li><button>Profile</button></li>
                    <li><button>Settings</button></li>
                </ul>
            </ix-dropdown>`,
  form: `<form>
            <label>
                Name
                <input type="text" required />
            </label>
            <button type="submit" data-intent="primary">Submit</button>
            </form>`,
  grid: `<section data-grid="3">
            <section>Column 1</section>
            <section>Column 2</section>
            <section>Column 3</section>
            </section>`,

  input: `<label>
                Username
            <input type="text" required placeholder="Enter Username..." />
            </label>`,
  meter: `<meter value="70" min="0" max="100" low="30" high="70" optimum="100"></meter>`,
  navigation: `<nav aria-label="Main Navigation">
                    <ul>
                        <li><a href="/" aria-current="page">Home</a></li>
                        <li><a href="/docs">Docs</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </nav>`,
  progress: `<progress value="50" max="100"></progress>`,
  radio: `<label>
                <input type="radio" name="options" value="a" />
                Option A
            </label>`,
  select: `<label>
                Options
                <select data-intent="primary">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                </select>
            </label>`,
  skeleton: `<span aria-busy="true" data-shape="text"></span>`,
  tabs: `<ix-tabs>
                <button slot="tab" aria-selected="true">Tab 1</button>
                <button slot="tab">Tab 2</button>
                <section slot="panel">Content for Tab 1</section>
                <section slot="panel" hidden>Content for Tab 2</section>
            </ix-tabs>`,
  table: `<table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alice</td>
                    <td>Developer</td>
                </tr>
            </tbody>
            </table>`,
  textarea: `<label>
                Message
                <textarea data-intent="primary" placeholder="Enter your message..."></textarea>
              </label>`,
  toast: `<ix-toast>
                <aside data-intent="success" data-open="true">
                    <strong>Success!</strong>
                    <span>Action completed.</span>
                </aside>
            </ix-toast>`,
  tooltip: `<ix-tooltip content="Helpful information">
                <span>Hover me</span>
            </ix-tooltip>`
}

export async function addCommand(component: string) {
  const normalized = component.toLowerCase().trim()
  const template = COMPONENT_TEMPLATES[normalized]

  if (!template) {
    console.log(pc.red(`Component "${component}" not found.`))

    console.log(
      pc.yellow(
        `Available components : ${Object.keys(COMPONENT_TEMPLATES).join(', ')}`
      )
    )
    return
  }
  console.log(pc.cyan(`\nTemplate for <${component}>:\n`))
  console.log(template)
  console.log('\n')
}
