const meta = {
  title: 'Components/Breadcrumb',
}

export default meta

export const Default = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Components</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Breadcrumb</a>
        </li>
      </ol>
    </nav>
  `,
}

export const SlashStyle = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="slash">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Docs</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Installation</a>
        </li>
      </ol>
    </nav>
  `,
}

export const GuilleметStyle = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="guillemet">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Library</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Guillemet</a>
        </li>
      </ol>
    </nav>
  `,
}

export const PipeStyle= {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="pipe">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Settings</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Pipe</a>
        </li>
      </ol>
    </nav>
  `,
}

export const ArrowStyle = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="arrow">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Products</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Arrow</a>
        </li>
      </ol>
    </nav>
  `,
}

export const ThreadStyle = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="thread">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Blog</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Thread</a>
        </li>
      </ol>
    </nav>
  `,
}

export const Success = {
  render: () => `
    <nav aria-label="Breadcrumb" data-intent="success">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Dashboard</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Projects</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Success</a>
        </li>
      </ol>
    </nav>
  `,
}

export const Warning = {
  render: () => `
    <nav aria-label="Breadcrumb" data-intent="warning">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Billing</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Payments</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Warning</a>
        </li>
      </ol>
    </nav>
  `,
}

export const Danger = {
  render: () => `
    <nav aria-label="Breadcrumb" data-intent="danger">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Admin</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Settings</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Danger</a>
        </li>
      </ol>
    </nav>
  `,
}

export const Gradient = {
  render: () => `
    <nav aria-label="Breadcrumb" data-intent="gradient">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Ignix Lite</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Documentation</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Gradient</a>
        </li>
      </ol>
    </nav>
  `,
}

export const SuccessWithThread = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="thread" data-intent="success">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Orders</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Shipped</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Delivered</a>
        </li>
      </ol>
    </nav>
  `,
}

export const DangerWithPipe = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="pipe" data-intent="danger">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Admin</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Users</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Delete</a>
        </li>
      </ol>
    </nav>
  `,
}

export const SingleItem = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Home</a>
        </li>
      </ol>
    </nav>
  `,
}

export const DeepPath = {
  render: () => `
    <nav aria-label="Breadcrumb" data-style="slash">
      <ol>
        <li>
          <a href="#" onclick="event.preventDefault()">Home</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Library</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Fiction</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()">Sci-Fi</a>
        </li>
        <li>
          <a href="#" onclick="event.preventDefault()" aria-current="page">Dune</a>
        </li>
      </ol>
    </nav>
  `,
}