const meta = {
  title: 'Components/Layout',
}

export default meta

export const AppShell = {
  render: () => `
    <div data-layout="app-shell" style="--ix-shell-h:420px;">
      <div data-region="header" data-layout="split">
        <strong>Ignix App</strong>
        <div data-layout="cluster" data-gap="sm">
          <button data-intent="ghost">Docs</button>
          <button data-intent="primary">Get Started</button>
        </div>
      </div>
      <div data-region="sidebar" data-layout="stack" data-gap="xs">
        <button data-intent="ghost" data-align="start">Overview</button>
        <button data-intent="ghost" data-align="start">Analytics</button>
        <button data-intent="ghost" data-align="start">Settings</button>
      </div>
      <div data-region="main" data-layout="stack" data-gap="md">
        <div data-layout="split">
          <h2>Dashboard</h2>
          <button data-intent="success">New Report</button>
        </div>
        <div data-layout="grid" data-cols="3" data-gap="md">
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <div data-layout="split">
              <strong>Users</strong>
              <mark data-intent="info">Active</mark>
            </div>
            <p>142 members this month</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <div data-layout="split">
              <strong>Revenue</strong>
              <mark data-intent="success">+12%</mark>
            </div>
            <p>$4,200 this week</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <div data-layout="split">
              <strong>Issues</strong>
              <mark data-intent="danger">Urgent</mark>
            </div>
            <p>3 unresolved tickets</p>
          </div>
        </div>
      </div>
      <div data-region="footer">Ignix Lite &mdash; Zero classes, ~8KB CSS</div>
    </div>
  `,
}

export const Box = {
  render: () => `
    <div data-layout="cluster" data-gap="lg">
      <div data-layout="box" data-width="sm" data-pad="lg" data-surface data-border data-radius>
        <h3>Default Box</h3>
        <p>Surface raised, border, and radius applied via data attributes.</p>
      </div>
      <div data-layout="box" data-width="sm" data-pad="md" data-surface data-radius>
        <h3>No Border</h3>
        <p>Borderless variation with rounded surface only.</p>
      </div>
    </div>
  `,
}

export const ContainerSection = {
  render: () => `
    <div data-layout="container" data-size="lg">
      <div data-layout="section" data-size="lg">
        <div data-layout="split" data-stack="sm">
          <hgroup>
            <h2>Page Title</h2>
            <p>Section description goes here</p>
          </hgroup>
          <div data-layout="cluster" data-gap="sm">
            <button data-intent="neutral">Filter</button>
            <button data-intent="primary">Create</button>
          </div>
        </div>
        <div data-layout="auto-grid" data-min="sm" data-gap="md">
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="info">Feature</mark>
            <p>Item One</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="success">Live</mark>
            <p>Item Two</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="warning">Beta</mark>
            <p>Item Three</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="neutral">Draft</mark>
            <p>Item Four</p>
          </div>
        </div>
      </div>
    </div>
  `,
}

export const Stack = {
  render: () => `
    <div data-layout="stack" data-gap="md">
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <div data-layout="split">
          <strong>First item</strong>
          <mark data-intent="info">1</mark>
        </div>
        <p>Stacked vertically with consistent gap</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <div data-layout="split">
          <strong>Second item</strong>
          <mark data-intent="success">2</mark>
        </div>
        <p>Each child gets the same gap from parent</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <div data-layout="split">
          <strong>Third item</strong>
          <mark data-intent="warning">3</mark>
        </div>
        <p>Responsive by default &mdash; no extra config</p>
      </div>
    </div>
  `,
}

export const Inline = {
  render: () => `
    <div data-layout="inline" data-gap="sm">
      <button data-intent="primary">Save</button>
      <button data-intent="neutral">Cancel</button>
      <button data-intent="danger">Delete</button>
    </div>
  `,
}

export const Cluster = {
  render: () => `
    <div data-layout="cluster" data-gap="sm">
      <mark data-intent="success">Active</mark>
      <mark data-intent="warning">Pending</mark>
      <mark data-intent="danger">Overdue</mark>
      <mark data-intent="neutral">Draft</mark>
      <button data-intent="ghost">Clear filters</button>
    </div>
  `,
}

export const Split = {
  render: () => `
    <div data-layout="stack" data-gap="md">
      <div data-layout="box" data-pad="md" data-surface data-border data-radius>
        <div data-layout="split">
          <hgroup>
            <h3>User Management</h3>
            <p>142 active accounts</p>
          </hgroup>
          <div data-layout="cluster" data-gap="sm">
            <button data-intent="neutral">Export</button>
            <button data-intent="primary">Invite User</button>
          </div>
        </div>
      </div>
      <div data-layout="box" data-pad="md" data-surface data-border data-radius>
        <div data-layout="split">
          <div data-layout="cluster" data-gap="sm">
            <mark data-intent="danger">Critical</mark>
            <span>3 unresolved incidents</span>
          </div>
          <button data-intent="danger">Resolve All</button>
        </div>
      </div>
    </div>
  `,
}

export const Sidebar = {
  render: () => `
    <div data-layout="sidebar" data-gap="lg">
      <div data-layout="stack" data-gap="sm">
        <strong>Filters</strong>
        <button data-intent="ghost" data-align="start">All Items</button>
        <button data-intent="ghost" data-align="start">Active</button>
        <button data-intent="ghost" data-align="start">Archived</button>
        <div data-layout="stack" data-gap="xs">
          <mark data-intent="success">Published</mark>
          <mark data-intent="warning">Draft</mark>
          <mark data-intent="danger">Expired</mark>
        </div>
      </div>
      <div data-layout="auto-grid" data-min="sm" data-gap="md">
        <div data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="info">Article</mark>
          <p>Published 2 days ago</p>
        </div>
        <div data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="warning">Draft</mark>
          <p>Design System &mdash; in progress</p>
        </div>
        <div data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="success">Ready</mark>
          <p>Q2 Report &mdash; for review</p>
        </div>
        <div data-layout="box" data-surface data-border data-radius data-pad="md">
          <mark data-intent="danger">Expired</mark>
          <p>Old Campaign &mdash; last month</p>
        </div>
      </div>
    </div>
  `,
}

export const Center = {
  render: () => `
    <div data-layout="center" data-height="content">
      <div data-layout="stack" data-align="center" data-gap="md" style="text-align: center;">
        <aside role="alert" data-intent="info">No results found for this filter.</aside>
        <p>Try adjusting your search or filters to see more results.</p>
        <div data-layout="cluster" data-gap="sm">
          <button data-intent="neutral">Clear Filters</button>
          <button data-intent="primary">Browse All</button>
        </div>
      </div>
    </div>
  `,
}

export const Grid = {
  render: () => `
    <div data-layout="stack" data-gap="lg">
      <div>
        <p>3-column grid</p>
        <div data-layout="grid" data-cols="3" data-gap="md">
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="info">Core</mark>
            <p>Feature One</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="success">Live</mark>
            <p>Feature Two</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <mark data-intent="warning">Beta</mark>
            <p>Feature Three</p>
          </div>
        </div>
      </div>
      <div>
        <p>Spanning items</p>
        <div data-layout="grid" data-cols="3" data-gap="md">
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <p>Normal card</p>
          </div>
          <div data-layout="box" data-surface data-border data-radius data-pad="md">
            <p>Regular card</p>
          </div>
          <div role="status" data-intent="success" data-span="full" style="padding: var(--ix-space-sm); border-radius: var(--ix-radius); background: var(--ix-success-bg); color: var(--ix-success); border: 1px solid var(--ix-border);">Full Width Banner &mdash; spans all 3 columns</div>
        </div>
      </div>
    </div>
  `,
}

export const AutoGrid = {
  render: () => `
    <div data-layout="auto-grid" data-min="md" data-gap="md">
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Analytics</mark>
        <p>Real-time insights</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="success">Security</mark>
        <p>Zero vulnerabilities</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="warning">Performance</mark>
        <p>Sub-100ms loads</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="danger">Support</mark>
        <p>SLA breach alert</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="neutral">Storage</mark>
        <p>Usage trending up</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Integrations</mark>
        <p>New API available</p>
      </div>
    </div>
  `,
}

export const Masonry = {
  render: () => `
    <div data-layout="masonry" data-cols="3">
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Short</mark>
        <p>Brief content</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="success">Tall</mark>
        <p>This card has significantly more content than its siblings. The masonry layout places it in the column with the most available vertical space, so columns stay balanced without any JavaScript.</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="warning">Medium</mark>
        <p>A bit more text here to make this card taller than the first but shorter than the second card.</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="danger">Very tall</mark>
        <p>This card has the most content of all. It demonstrates how the CSS column-count property handles variable height items. Each item breaks to avoid splitting across columns. No JavaScript required &mdash; pure CSS masonry.</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="neutral">Short</mark>
        <p>Brief</p>
      </div>
      <div data-layout="box" data-surface data-border data-radius data-pad="md">
        <mark data-intent="info">Another</mark>
        <p>Medium length content that fills this card a bit more than the shortest ones.</p>
      </div>
    </div>
  `,
}

export const Aspect = {
  render: () => `
    <div data-layout="cluster" data-gap="md">
      <div>
        <div style="margin-bottom: var(--ix-space-sm);">16:9 Video</div>
        <div data-layout="aspect" data-ratio="video" style="width:200px; border: 1px solid var(--ix-border); border-radius: var(--ix-radius);">
          <div role="img" aria-label="16:9 aspect ratio preview" style="background: var(--ix-primary-bg); display: flex; align-items: center; justify-content: center; font-size: var(--ix-size-xs); color: var(--ix-primary); font-weight: bold;">16:9</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: var(--ix-space-sm);">1:1 Square</div>
        <div data-layout="aspect" data-ratio="square" style="width:140px; border: 1px solid var(--ix-border); border-radius: var(--ix-radius);">
          <div role="img" aria-label="1:1 aspect ratio preview" style="background: var(--ix-primary-bg); display: flex; align-items: center; justify-content: center; font-size: var(--ix-size-xs); color: var(--ix-primary); font-weight: bold;">1:1</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: var(--ix-space-sm);">3:4 Portrait</div>
        <div data-layout="aspect" data-ratio="portrait" style="width:120px; border: 1px solid var(--ix-border); border-radius: var(--ix-radius);">
          <div role="img" aria-label="3:4 aspect ratio preview" style="background: var(--ix-primary-bg); display: flex; align-items: center; justify-content: center; font-size: var(--ix-size-xs); color: var(--ix-primary); font-weight: bold;">3:4</div>
        </div>
      </div>
    </div>
  `,
}

export const FormLayout = {
  render: () => `
    <div data-layout="cluster" data-gap="xl">
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
        <div data-layout="cluster" data-gap="sm">
          <button type="submit" data-intent="primary">Sign In</button>
          <button type="button" data-intent="ghost">Forgot password?</button>
        </div>
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
        <div data-layout="cluster" data-gap="sm">
          <button type="submit" data-intent="success">Send Message</button>
          <button type="reset" data-intent="neutral">Clear</button>
        </div>
      </form>
    </div>
  `,
}

export const Spacer = {
  render: () => `
    <div data-layout="box" data-pad="lg" data-surface data-border data-radius>
      <p>Content above spacer</p>
      <div data-layout="spacer" data-size="lg"></div>
      <p>Content below spacer &mdash; lg gap applied via data attribute</p>
    </div>
  `,
}

export const PinHelper = {
  render: () => `
    <div data-layout="center" data-height="content" style="position:relative;">
      <p>Page content area &mdash; button is pinned to bottom-right via data-pin</p>
      <button data-intent="primary" data-pin="absolute" data-position="bottom-right">Help</button>
    </div>
  `,
}

export const DebugMode = {
  render: () => `
    <div data-layout="stack" data-gap="md" data-debug>
      <div data-layout="split" data-debug>
        <span>Debug outlines show layout boundaries</span>
        <button data-intent="neutral">Action</button>
      </div>
      <div data-layout="cluster" data-gap="sm" data-debug>
        <mark data-intent="success">Tag A</mark>
        <mark data-intent="warning">Tag B</mark>
        <mark data-intent="danger">Tag C</mark>
      </div>
    </div>
  `,
}
