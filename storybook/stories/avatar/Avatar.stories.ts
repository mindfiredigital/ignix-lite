const meta = {
  title: 'Components/Avatar',
}

export default meta

export const Image = {
  render: () => `
    <img src="https://picsum.photos/100" alt="User" data-size="md">
  `,
}

export const Sizes = {
  render: () => `
    <img src="https://picsum.photos/100" alt="User" data-size="sm">
    <img src="https://picsum.photos/100" alt="User" data-size="md">
    <img src="https://picsum.photos/100" alt="User" data-size="lg">
  `,
}

export const Fallback = {
  render: () => `
    <span data-size="md">JD</span>
  `,
}

