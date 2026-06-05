const meta = {
  title: 'Components/Table',
}

export default meta

export const Default = {
  render: () => `
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td><mark data-intent="success">Active</mark></td>
          </tr>

          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td><mark data-intent="danger">Inactive</mark></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
}

export const Sortable = {
  render: () => `
    <section>
      <table is="ix-table">
        <thead>
          <tr>
            <th data-sortable aria-sort="ascending">Name</th>
            <th data-sortable aria-sort="ascending">Email</th>
            <th data-sortable aria-sort="ascending">Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>Admin</td>
            <td><mark data-intent="success">Active</mark></td>
          </tr>

          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>User</td>
            <td><mark data-intent="warning">Pending</mark></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
}

