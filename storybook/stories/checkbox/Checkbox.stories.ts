const meta = {
  title: "Components/Checkbox",
}

export default meta

export const Default = {
  render: () => `
    <label>
      <input type="checkbox">
      Accept terms
    </label>
  `,
}

export const Checked = {
  render: () => `
    <label>
      <input type="checkbox" checked>
      Accepted
    </label>
  `,
}

export const Disabled = {
  render: () => `
    <label>
      <input type="checkbox" disabled>
      Disabled
    </label>
  `,
}

export const Required = {
  render: () => `
    <label>
      <input type="checkbox" required>
      Required field
    </label>
  `,
}

export const Group = {
  render: () => `
    <label>
      <input type="checkbox" name="lang" value="js">
      JavaScript
    </label>

    <label>
      <input type="checkbox" name="lang" value="py">
      Python
    </label>

    <label>
      <input type="checkbox" name="lang" value="java">
      Java
    </label>
  `,
}


export const Success = {
  render: () => `
    <label data-intent="success">
      <input type="checkbox" checked>
      Success
    </label>
  `,
}

export const Danger = {
  render: () => `
    <label data-intent="danger">
      <input type="checkbox" checked>
      Danger
    </label>
  `,
}

export const Warning = {
  render: () => `
    <label data-intent="warning">
      <input type="checkbox" checked>
      Warning
    </label>
  `,
}


export const Sizes = {
  render: () => `
    <label data-size="sm">
      <input type="checkbox" checked>
      Small
    </label>

    <label data-size="md">
      <input type="checkbox" checked>
      Medium
    </label>

    <label data-size="lg">
      <input type="checkbox" checked>
      Large
    </label>
  `,
}
