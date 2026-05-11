const meta = {
  title: 'Components/Table',
}

export default meta

export const Default = {
  render: () => `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>John</td>
          <td>john@example.com</td>
        </tr>

        <tr>
          <td>Jane</td>
          <td>jane@example.com</td>
        </tr>
      </tbody>
    </table>
  `,
}

export const Sortable = {
  render: () => `
    <table data-sortable>
      <thead>
        <tr>
          <th aria-sort="ascending">Name</th>
          <th aria-sort="descending">Email</th>
          <th aria-sort="none">Role</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Jane</td>
          <td>jane@example.com</td>
          <td>Admin</td>
        </tr>

        <tr>
          <td>John</td>
          <td>john@example.com</td>
          <td>User</td>
        </tr>
      </tbody>
    </table>
  `,
}

