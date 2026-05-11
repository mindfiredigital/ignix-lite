const meta = {
  title: 'Components/Alert'
}

export default meta

export const Default = {
  render: () => `
    <aside data-intent="info" >
      Default alert message
    </aside>
  `
}

export const Danger = {
  render: () => `
    <aside data-intent="danger">
      Something went wrong
    </aside>
  `
}

export const Warning = {
  render: () => `
    <aside data-intent="warning">
      Please review before continuing
    </aside>
  `
}

export const Success = {
  render: () => `
    <aside data-intent="success">
      Saved successfully
    </aside>
  `
}

export const Info = {
  render: () => `
    <aside data-intent="info">
      Informational message
    </aside>
  `
}

export const AllVariants = {
  render: () => `
    <section>
      <aside data-intent="danger">Danger</aside>
      <aside data-intent="warning">Warning</aside>
      <aside data-intent="success">Success</aside>
      <aside data-intent="info">Info</aside>
    </section>
  `
}

