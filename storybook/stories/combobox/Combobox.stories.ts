export default {
  title: 'Components/Combobox'
}


export const Basic = () => `
<ix-combobox>
  <label part="control">
    <input placeholder="Select..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>React</li>
    <li>Vue</li>
    <li>Angular</li>
  </ul>
</ix-combobox>
`


export const Intents = () => `
<ix-combobox data-intent="primary">
  <label part="control">
    <input placeholder="Primary..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</ix-combobox>

<ix-combobox data-intent="success">
  <label part="control">
    <input placeholder="Success..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</ix-combobox>

<ix-combobox data-intent="warning">
  <label part="control">
    <input placeholder="Warning..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</ix-combobox>

<ix-combobox data-intent="danger">
  <label part="control">
    <input placeholder="Danger..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</ix-combobox>

<ix-combobox data-intent="gradient">
  <label part="control">
    <input placeholder="Gradient..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</ix-combobox>
`


export const Search = () => `
<ix-combobox>
  <label part="control">
    <input placeholder="Type to filter..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>React</li>
    <li>Vue</li>
    <li>Angular</li>
    <li>Svelte</li>
    <li>Next.js</li>
  </ul>
</ix-combobox>
`

export const Multiple = () => `
<ix-combobox multiple data-intent="success">
  <label part="control">
    <span data-chips></span>
    <input placeholder="Select multiple..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>React</li>
    <li>Vue</li>
    <li>Angular</li>
    <li>Svelte</li>
  </ul>
</ix-combobox>
`