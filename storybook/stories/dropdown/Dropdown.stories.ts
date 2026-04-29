export default {
  title: 'Components/Dropdown'
}

export const Default = () => `
<ix-dropdown>
  <button slot="trigger">Options ▾</button>
  <ul slot="menu">
    <li><button>Profile</button></li>
    <li><button>Settings</button></li>
  </ul>
</ix-dropdown>
`

export const Primary = () => `
<ix-dropdown data-intent="primary">
  <button slot="trigger">Primary ▾</button>
  <ul slot="menu">
    <li><button>Dashboard</button></li>
    <li><button>Profile</button></li>
  </ul>
</ix-dropdown>
`

export const Success = () => `
<ix-dropdown data-intent="success">
  <button slot="trigger">Success ▾</button>
  <ul slot="menu">
    <li><button>Saved</button></li>
    <li><button>Completed</button></li>
  </ul>
</ix-dropdown>
`

export const Warning = () => `
<ix-dropdown data-intent="warning">
  <button slot="trigger">Warning ▾</button>
  <ul slot="menu">
    <li><button>Pending</button></li>
    <li><button>Review</button></li>
  </ul>
</ix-dropdown>
`

export const Danger = () => `
<ix-dropdown data-intent="danger">
  <button slot="trigger">Danger ▾</button>
  <ul slot="menu">
    <li><button>Delete</button></li>
    <li><button>Remove</button></li>
  </ul>
</ix-dropdown>
`

export const Neutral = () => `
<ix-dropdown data-intent="neutral">
  <button slot="trigger">Neutral ▾</button>
  <ul slot="menu">
    <li><button>Docs</button></li>
    <li><button>Help</button></li>
  </ul>
</ix-dropdown>
`

export const Ghost = () => `
<ix-dropdown data-intent="ghost">
  <button slot="trigger">Ghost ▾</button>
  <ul slot="menu">
    <li><button>Item 1</button></li>
    <li><button>Item 2</button></li>
  </ul>
</ix-dropdown>
`

export const Gradient = () => `
<ix-dropdown data-intent="gradient">
  <button slot="trigger">Gradient ▾</button>
  <ul slot="menu">
    <li><button>Cool</button></li>
    <li><button>Modern</button></li>
  </ul>
</ix-dropdown>
`