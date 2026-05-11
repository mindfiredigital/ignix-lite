const meta = {
  title: 'Components/Form',
}
 
export default meta
 
export const Default = {
  render: () => `
    <form id="signup" action="#" method="post" onsubmit="event.preventDefault()">
      <label>
        Name
        <input type="text" name="name">
      </label>
 
      <label>
        Email
        <input type="email" name="email" >
      </label>
 
      <label>
        Password
        <input type="password" name="password">
      </label>
 
      <button type="submit">Submit</button>
    </form>
  `,
}
 
export const Loading = {
  render: () => `
    <form id="signup" action="#" method="post" aria-busy="true" data-loading onsubmit="event.preventDefault()">
      <label>
        Email
        <input type="email" name="email" >
      </label>
 
      <button type="submit">Submitting...</button>
    </form>
  `,
}
 
export const ValidationError = {
  render: () => `
    <form onsubmit="event.preventDefault()">

      <label data-state="error">
        Email
        <input type="email" value="invalid-email" aria-invalid="true"> 
        <small>Please enter a valid email address.</small>
      </label>
    </form>
  `
}