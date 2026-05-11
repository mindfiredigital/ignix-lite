const meta = {
  title: 'Components/Select'
}

export default meta


export const Default = {
  render: () => `
    <label>
      Country
      <select data-intent="neutral">
        <option value="in">India</option>
        <option value="us">USA</option>
      </select>
    </label>
  `
}


export const Primary = {
  render: () => `
    <label>
      Primary
      <select data-intent="primary">
        <option>India</option>
        <option>USA</option>
      </select>
    </label>
  `
}


export const Danger = {
  render: () => `
    <label>
      Danger
      <select data-intent="danger">
        <option>Error</option>
        <option>Fail</option>
      </select>
    </label>
  `
}


export const Warning = {
  render: () => `
    <label>
      Warning
      <select data-intent="warning">
        <option>Warning</option>
        <option>Review</option>
      </select>
    </label>
  `
}


export const Success = {
  render: () => `
    <label>
      Success
      <select data-intent="success">
        <option>Done</option>
        <option>Saved</option>
      </select>
    </label>
  `
}


export const Disabled = {
  render: () => `
    <label>
      Disabled
      <select data-intent="neutral" disabled>
        <option>Disabled</option>
      </select>
    </label>
  `
}


export const Invalid = {
  render: () => `
    <label>
      Invalid
      <select data-intent="neutral" aria-invalid="true">
        <option>Error</option>
      </select>
    </label>
  `
}


export const Multiple = {
  render: () => `
  
    <label>
      Select countries
      <select data-intent="neutral" multiple>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </select>
    </label>

    
  `
}


export const AllVariants = {
  render: () => `
    <section style="display:flex; flex-direction:column; gap:1rem;">
      
      <label>
        Default
        <select data-intent="neutral">
          <option>India</option>
        </select>
      </label>

      <label>
        Primary
        <select data-intent="primary">
          <option>India</option>
        </select>
      </label>

      <label>
        Danger
        <select data-intent="danger">
          <option>Error</option>
        </select>
      </label>

      <label>
        Warning
        <select data-intent="warning">
          <option>Warning</option>
        </select>
      </label>

      <label>
        Success
        <select data-intent="success">
          <option>Success</option>
        </select>
      </label>

    </section>
  `
}
