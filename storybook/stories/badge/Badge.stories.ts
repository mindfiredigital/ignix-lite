const meta = {
  title: 'Components/Badge',
}

export default meta

export const Default = {
  render: () => `<mark data-intent="neutral">Neutral</mark>`
}

export const AllIntents = {
  render: () => `
    <section>
      <mark data-intent="danger">Danger</mark>
      <mark data-intent="warning">Warning</mark>
      <mark data-intent="success">Success</mark>
      <mark data-intent="neutral">Neutral</mark>
    </section>
  `
}

export const StatusVariant = {
  render: () => `
    <span role="status" data-intent="success">Active</span>
  `
}

export const LongText = {
  render: () => `
    <mark data-intent="warning">Very Long Badge Text</mark>
  `
}


