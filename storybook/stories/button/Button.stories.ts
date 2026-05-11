const meta = {
  title: 'Components/Button'
}

export default meta

export const Default = {
  render: () => `<button>Default</button>`
}

export const Primary = {
  render: () => `<button data-intent="primary">Primary</button>`
}

export const Danger = {
  render: () => `<button data-intent="danger">Danger</button>`
}

export const Ghost = {
  render: () => `<button data-intent="ghost">Ghost</button>`
}

export const Warning = {
  render: () => `<button data-intent="warning">Warning</button>`
}

export const Success = {
  render: () => `<button data-intent="success">Success</button>`
}

export const Neutral = {
  render: () => `<button data-intent="neutral">Neutral</button>`
}

export const Disabled = {
  render: () => `<button data-intent="primary" disabled>Disabled</button>`
}

export const Loading = {
  render: () => `<button data-intent="primary" aria-busy="true"><span>Loading</span></button>`
}

export const AllVariants = {
  render: () => `
    <section>
      <button data-intent="primary">Primary</button>
      <button data-intent="danger">Danger</button>
      <button data-intent="ghost">Ghost</button>
      <button data-intent="warning">Warning</button>
      <button data-intent="success">Success</button>
      <button data-intent="neutral">Neutral</button>
      
    </section>
  `
}
