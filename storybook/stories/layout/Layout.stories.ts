const meta = {
  title: 'Components/Layout',
}

export default meta

export const AppShell = {
  render: () => `
    <section data-layout="app-shell" style="--ix-shell-h:420px;">
      <header data-region="header" data-layout="split">
        <strong>Ignix App</strong>
        <nav data-layout="inline" data-gap="sm">
          <button data-intent="ghost">Docs</button>
          <button data-intent="primary">Get Started</button>
        </nav>
      </header>
      <aside data-region="sidebar" data-layout="stack" data-gap="xs">
        <button data-intent="ghost">Overview</button>
        <button data-intent="ghost">Analytics</button>
        <button data-intent="ghost">Settings</button>
      </aside>
      <main data-region="main" data-layout="stack" data-gap="md">
        <header data-layout="split">
          <h2>Dashboard</h2>
          <button data-intent="success">New Report</button>
        </header>
        <section data-layout="grid" data-cols="3" data-gap="md">
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <header data-layout="split">
              <strong>Users</strong>
              <mark data-intent="info">Active</mark>
            </header>
            <p>142 members this month</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <header data-layout="split">
              <strong>Revenue</strong>
              <mark data-intent="success">+12%</mark>
            </header>
            <p>$4,200 this week</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <header data-layout="split">
              <strong>Issues</strong>
              <mark data-intent="danger">Urgent</mark>
            </header>
            <p>3 unresolved tickets</p>
          </article>
        </section>
      </main>
      <footer data-region="footer">Ignix Lite &mdash; Zero classes, ~8KB CSS</footer>
    </section>
  `,
}

export const Box = {
  render: () => `
    <section data-layout="cluster" data-gap="lg">
      <article data-layout="box" data-width="sm" data-pad="lg" data-surface data-border data-radius>
        <h3>Default Box</h3>
        <p>Surface raised, border, and radius applied via data attributes.</p>
      </article>
      <article data-layout="box" data-width="sm" data-pad="md" data-surface data-radius>
        <h3>No Border</h3>
        <p>Borderless variation with rounded surface only.</p>
      </article>
    </section>
  `,
}

export const ContainerSection = {
  render: () => `
    <main data-layout="container" data-size="lg">
      <section data-layout="section" data-size="lg">
        <header data-layout="split" data-stack="sm">
          <hgroup>
            <h2>Page Title</h2>
            <p>Section description goes here</p>
          </hgroup>
          <nav data-layout="cluster" data-gap="sm">
            <button data-intent="neutral">Filter</button>
            <button data-intent="primary">Create</button>
          </nav>
        </header>
        <section data-layout="auto-grid" data-min="sm" data-gap="md">
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="info">Feature</mark>
            <p>Item One</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="success">Live</mark>
            <p>Item Two</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="warning">Beta</mark>
            <p>Item Three</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="neutral">Draft</mark>
            <p>Item Four</p>
          </article>
        </section>
      </section>
    </main>
  `,
}

export const Stack = {
  render: () => `
    <section data-layout="stack" data-gap="md">
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <header data-layout="split">
          <strong>First item</strong>
          <mark data-intent="info">1</mark>
        </header>
        <p>Stacked vertically with consistent gap</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <header data-layout="split">
          <strong>Second item</strong>
          <mark data-intent="success">2</mark>
        </header>
        <p>Each child gets the same gap from parent</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <header data-layout="split">
          <strong>Third item</strong>
          <mark data-intent="warning">3</mark>
        </header>
        <p>Responsive by default &mdash; no extra config</p>
      </article>
    </section>
  `,
}

export const Inline = {
  render: () => `
    <nav data-layout="inline" data-gap="sm">
      <button data-intent="primary">Save</button>
      <button data-intent="neutral">Cancel</button>
      <button data-intent="danger">Delete</button>
    </nav>
  `,
}

export const Cluster = {
  render: () => `
    <nav data-layout="cluster" data-gap="sm">
      <mark data-intent="success">Active</mark>
      <mark data-intent="warning">Pending</mark>
      <mark data-intent="danger">Overdue</mark>
      <mark data-intent="neutral">Draft</mark>
      <button data-intent="ghost">Clear filters</button>
    </nav>
  `,
}

export const Split = {
  render: () => `
    <section data-layout="stack" data-gap="md">
      <article data-layout="box" data-pad="md" data-surface data-border data-radius>
        <header data-layout="split">
          <hgroup>
            <h3>User Management</h3>
            <p>142 active accounts</p>
          </hgroup>
          <nav data-layout="inline" data-gap="sm">
            <button data-intent="neutral">Export</button>
            <button data-intent="primary">Invite User</button>
          </nav>
        </header>
      </article>
      <article data-layout="box" data-pad="md" data-surface data-border data-radius>
        <header data-layout="split">
          <nav data-layout="inline" data-gap="sm">
            <mark data-intent="danger">Critical</mark>
            <span>3 unresolved incidents</span>
          </nav>
          <button data-intent="danger">Resolve All</button>
        </header>
      </article>
    </section>
  `,
}

export const Sidebar = {
  render: () => `
    <section data-layout="sidebar" data-gap="lg">
      <aside data-layout="stack" data-gap="sm">
        <strong>Filters</strong>
        <button data-intent="ghost">All Items</button>
        <button data-intent="ghost">Active</button>
        <button data-intent="ghost">Archived</button>
        <nav data-layout="stack" data-gap="xs">
          <mark data-intent="success">Published</mark>
          <mark data-intent="warning">Draft</mark>
          <mark data-intent="danger">Expired</mark>
        </nav>
      </aside>
      <section data-layout="auto-grid" data-min="sm" data-gap="md">
        <article data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="info">Article</mark>
          <p>Published 2 days ago</p>
        </article>
        <article data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="warning">Draft</mark>
          <p>Design System &mdash; in progress</p>
        </article>
        <article data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="success">Ready</mark>
          <p>Q2 Report &mdash; for review</p>
        </article>
        <article data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="danger">Expired</mark>
          <p>Old Campaign &mdash; last month</p>
        </article>
      </section>
    </section>
  `,
}

export const Center = {
  render: () => `
    <section data-layout="center" data-height="content">
      <section data-layout="stack" data-gap="md">
        <aside role="alert" data-intent="info">No results found for this filter.</aside>
        <p>Try adjusting your search or filters to see more results.</p>
        <nav data-layout="inline" data-gap="sm">
          <button data-intent="neutral">Clear Filters</button>
          <button data-intent="primary">Browse All</button>
        </nav>
      </section>
    </section>
  `,
}

export const Grid = {
  render: () => `
    <section data-layout="stack" data-gap="lg">
      <section>
        <p>3-column grid</p>
        <section data-layout="grid" data-cols="3" data-gap="md">
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="info">Core</mark>
            <p>Feature One</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="success">Live</mark>
            <p>Feature Two</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="warning">Beta</mark>
            <p>Feature Three</p>
          </article>
        </section>
      </section>
      <section>
        <p>Spanning items</p>
        <section data-layout="grid" data-cols="3" data-gap="md">
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <p>Normal card</p>
          </article>
          <article data-layout="box" data-surface data-border data-radius data-pad="md">
            <p>Regular card</p>
          </article>
          <aside role="status" data-intent="success" data-span="full">Full Width Banner &mdash; spans all 3 columns</aside>
        </section>
      </section>
    </section>
  `,
}

export const AutoGrid = {
  render: () => `
    <section data-layout="auto-grid" data-min="md" data-gap="md">
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Analytics</mark>
        <p>Real-time insights</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="success">Security</mark>
        <p>Zero vulnerabilities</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="warning">Performance</mark>
        <p>Sub-100ms loads</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="danger">Support</mark>
        <p>SLA breach alert</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="neutral">Storage</mark>
        <p>Usage trending up</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Integrations</mark>
        <p>New API available</p>
      </article>
    </section>
  `,
}

export const Masonry = {
  render: () => `
    <section data-layout="masonry" data-cols="3">
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Short</mark>
        <p>Brief content</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="success">Tall</mark>
        <p>This card has significantly more content than its siblings. The masonry layout places it in the column with the most available vertical space, so columns stay balanced without any JavaScript.</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="warning">Medium</mark>
        <p>A bit more text here to make this card taller than the first but shorter than the second card.</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="danger">Very tall</mark>
        <p>This card has the most content of all. It demonstrates how the CSS column-count property handles variable height items. Each item breaks to avoid splitting across columns. No JavaScript required &mdash; pure CSS masonry.</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="neutral">Short</mark>
        <p>Brief</p>
      </article>
      <article data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Another</mark>
        <p>Medium length content that fills this card a bit more than the shortest ones.</p>
      </article>
    </section>
  `,
}

export const Aspect = {
  render: () => `
    <section data-layout="cluster" data-gap="md">
      <figure>
        <figcaption>16:9 Video</figcaption>
        <figure data-layout="aspect" data-ratio="video" style="width:200px;">
          <aside role="img" aria-label="16:9 aspect ratio preview"></aside>
        </figure>
      </figure>
      <figure>
        <figcaption>1:1 Square</figcaption>
        <figure data-layout="aspect" data-ratio="square" style="width:140px;">
          <aside role="img" aria-label="1:1 aspect ratio preview"></aside>
        </figure>
      </figure>
      <figure>
        <figcaption>3:4 Portrait</figcaption>
        <figure data-layout="aspect" data-ratio="portrait" style="width:120px;">
          <aside role="img" aria-label="3:4 aspect ratio preview"></aside>
        </figure>
      </figure>
    </section>
  `,
}

export const FormLayout = {
  render: () => `
    <section data-layout="cluster" data-gap="xl">
      <form data-layout="form" data-grow>
        <h3>Sign In</h3>
        <label data-layout="field-group">
          Email
          <input type="email" required placeholder="you@example.com" />
        </label>
        <label data-layout="field-group">
          Password
          <input type="password" required placeholder="Enter password" />
        </label>
        <nav data-layout="inline" data-gap="sm">
          <button type="submit" data-intent="primary">Sign In</button>
          <button type="button" data-intent="ghost">Forgot password?</button>
        </nav>
      </form>
      <form data-layout="form" data-grow>
        <h3>Contact Us</h3>
        <label data-layout="field-group">
          Name
          <input type="text" required placeholder="Jane Doe" />
        </label>
        <label data-layout="field-group">
          Message
          <textarea rows="4" placeholder="Write your message here..."></textarea>
        </label>
        <nav data-layout="inline" data-gap="sm">
          <button type="submit" data-intent="success">Send Message</button>
          <button type="reset" data-intent="neutral">Clear</button>
        </nav>
      </form>
    </section>
  `,
}

export const Spacer = {
  render: () => `
    <article data-layout="box" data-pad="lg" data-surface data-border data-radius>
      <p>Content above spacer</p>
      <span data-layout="spacer" data-size="lg"></span>
      <p>Content below spacer &mdash; lg gap applied via data attribute</p>
    </article>
  `,
}

export const PinHelper = {
  render: () => `
    <section data-layout="center" data-height="content" style="position:relative;">
      <p>Page content area &mdash; button is pinned to bottom-right via data-pin</p>
      <button data-intent="primary" data-pin="absolute" data-position="bottom-right">Help</button>
    </section>
  `,
}

export const DebugMode = {
  render: () => `
    <section data-layout="stack" data-gap="md" data-debug>
      <header data-layout="split" data-debug>
        <span>Debug outlines show layout boundaries</span>
        <button data-intent="neutral">Action</button>
      </header>
      <nav data-layout="cluster" data-gap="sm" data-debug>
        <mark data-intent="success">Tag A</mark>
        <mark data-intent="warning">Tag B</mark>
        <mark data-intent="danger">Tag C</mark>
      </nav>
    </section>
  `,
}
