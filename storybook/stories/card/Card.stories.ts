const meta = {
  title: 'Components/Card',
}

export default meta

export const Default = {
  render: () => `
    <article>
      <img slot="avatar" src="https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg" alt="User">

      <span slot="title">Neha Sharma</span>

      <span slot="meta">Frontend Developer</span>

      <p slot="body">
        Building accessible UI components.
      </p>

      <button slot="action">Follow</button>

      <span slot="footer">Joined 2024</span>
    </article>
  `,
}

