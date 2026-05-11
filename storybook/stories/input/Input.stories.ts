const meta = {
  title: 'Components/Input'
}
 
export default meta
 
export const Default = {
  render: () => `
    <label>
      Name
      <input type="text" placeholder="Enter name" />
    </label>
  `
}
 
export const Primary = {
  render: () => `
    <label>
      Primary
      <input type="text" data-intent="primary" />
    </label>
  `
}
 
export const Danger = {
  render: () => `
    <label>
      Danger
      <input type="text" data-intent="danger" />
    </label>
  `
}
 
export const Warning = {
  render: () => `
    <label>
      Warning
      <input type="text" data-intent="warning" />
    </label>
  `
}
 
export const Success = {
  render: () => `
    <label>
      Success
      <input type="text" data-intent="success" />
    </label>
  `
}
 
export const Neutral = {
  render: () => `
    <label>
      Neutral
      <input type="text" data-intent="neutral" />
    </label>
  `
}
 
export const Disabled = {
  render: () => `
    <label>
      Disabled
      <input type="text" disabled />
    </label>
  `
}
 
export const Invalid = {
  render: () => `
    <label>
      Invalid
      <input type="text" aria-invalid="true" />
    </label>
  `
}
 

 
export const AllTypes = {
  render: () => `
    <section>
      <label>Text <input type="text" /></label>
      <label>Email <input type="email" /></label>
      <label>Password <input type="password" /></label>
      <label>Number <input type="number" /></label>
      <label>Tel <input type="tel" /></label>
      <label>Date <input type="date" /></label>
      <label>Search <input type="search" /></label>
      <label>URL <input type="url" /></label>
      <label>File <input type="file" /></label>
    </section>
  `
}

export const AllVariants = {
  render: () => `
    <section>
      <label>Primary <input type="text" data-intent="primary" /></label>
      <label>Danger <input type="text" data-intent="danger" /></label>
      <label>Warning <input type="text" data-intent="warning" /></label>
      <label>Success <input type="text" data-intent="success" /></label>
      <label>Neutral <input type="text" /></label>
      <label>Invalid <input type="text" aria-invalid="true" /></label>
      <label>Disabled <input type="text" disabled /></label>
    </section>
  `
}
