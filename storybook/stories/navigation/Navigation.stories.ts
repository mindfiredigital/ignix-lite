const meta = {
  title: 'Components/Navigation',
}

export default meta

export const Default = {
  render: () => `
    <nav>
      <ul>
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  `,
}

export const Extended = {
  render: () => `
    <nav>
      <ul>
        <li><a href="#" aria-current="page">Dashboard</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </nav>
  `,
}


