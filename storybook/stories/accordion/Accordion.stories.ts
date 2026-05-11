const meta = {
  title: 'Components/Accordion',
}

export default meta

export const Default = {
  render: () => `
    <details>
      <summary>What is ignix-lite?</summary>
      <p>A minimal UI library built for agents and developers.</p>
    </details>
  `
}

export const OpenByDefault= {
  render: () => `
    <details open>
      <summary>How does this work?</summary>
      <p>Uses native HTML details and summary elements.</p>
    </details>
  `
}

export const MultipleItems = {
  render: () => `
    <section>
      <details>
        <summary>What is ignix-lite?</summary>
        <p>A minimal UI library.</p>
      </details>

      <details>
        <summary>Is it accessible?</summary>
        <p>Yes, it uses native browser behavior.</p>
      </details>

      <details>
        <summary>Does it require JS?</summary>
        <p>No, it works without JavaScript.</p>
      </details>
    </section>
  `
}
