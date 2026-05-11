const meta = {
  title: 'Components/Textarea'
}

export default meta

export const Default = {
  render: () => `
    <label>
      Message
      <textarea rows="3" placeholder="Enter message"></textarea>
    </label>
  `
}

export const Rows = {
  render: () => `
    <section>
      <label>2 Rows <textarea rows="2"></textarea></label>
      <label>4 Rows <textarea rows="4"></textarea></label>
      <label>6 Rows <textarea rows="6"></textarea></label>
    </section>
  `
}

export const Required = {
  render: () => `
    <label>
      Required
      <textarea rows="3" required placeholder="Required field"></textarea>
    </label>
  `
}

export const Disabled = {
  render: () => `
    <label>
      Disabled
      <textarea rows="3" disabled></textarea>
    </label>
  `
}

export const Invalid = {
  render: () => `
    <label>
      Invalid
      <textarea rows="3" aria-invalid="true"></textarea>
    </label>
  `
}

export const AllVariants = {
  render: () => `
    <section>
      <label>Primary <textarea data-intent="primary"></textarea></label>
      <label>Danger <textarea data-intent="danger"></textarea></label>
      <label>Warning <textarea data-intent="warning"></textarea></label>
      <label>Success <textarea data-intent="success"></textarea></label>
      <label>Neutral <textarea></textarea></label>
      <label>Invalid <textarea aria-invalid="true"></textarea></label>
      <label>Disabled <textarea disabled></textarea></label>
    </section>
  `
}
