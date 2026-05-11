const meta = {
  title: 'Components/Divider',
}

export default meta

export const Default = {
  render: () => `
    <hr>
  `,
}

export const Vertical = {
  render: () => `
    <div style="display:flex; align-items:center; height:40px;">
      <span>Item</span>
      <hr data-orientation="vertical">
      <span>Item</span>
    </div>
  `,
}



