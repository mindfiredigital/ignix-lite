const meta = {
  title: 'Components/Radio'
}

export default meta


export const Default = {
  render: () => `
    <label>
      <input type="radio" name="lang">
      JavaScript
    </label>
  `
}

export const Checked = {
  render: () => `
    <label>
      <input type="radio" name="lang" checked>
      JavaScript
    </label>
  `
}

export const Disabled = {
  render: () => `
    <label>
      <input type="radio" name="lang" disabled>
      Disabled
    </label>
  `
}

export const Required = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <label>
        <input type="radio" name="req" required>
        JavaScript
      </label>

      <label>
        <input type="radio" name="req">
        Python
      </label>

      <label>
        <input type="radio" name="req">
        Java
      </label>
    </div>
  `
}

export const Group = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <label>
        <input type="radio" name="group" value="js">
        JavaScript
      </label>

      <label>
        <input type="radio" name="group" value="py">
        Python
      </label>

      <label>
        <input type="radio" name="group" value="java">
        Java
      </label>
    </div>
  `
}


export const Intents = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <label data-intent="primary">
        <input type="radio" name="intent" checked>
        Primary
      </label>

      <label data-intent="success">
        <input type="radio" name="intent">
        Success
      </label>

      <label data-intent="danger">
        <input type="radio" name="intent">
        Danger
      </label>

      <label data-intent="warning">
        <input type="radio" name="intent">
        Warning
      </label>

      <label data-intent="neutral">
        <input type="radio" name="intent">
        Neutral
      </label>
    </div>
  `
}


export const Sizes = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <label data-size="sm">
        <input type="radio" name="size">
        Small
      </label>

      <label data-size="md">
        <input type="radio" name="size" checked>
        Medium
      </label>

      <label data-size="lg">
        <input type="radio" name="size">
        Large
      </label>
    </div>
  `
}
