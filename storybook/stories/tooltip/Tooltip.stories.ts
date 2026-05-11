const meta = {
  title: 'Components/Tooltip',
}

export default meta

export const Default = {
  render: () => `
    <ix-tooltip content="Tooltip text">
      <button data-intent="primary">Hover me</button>
    </ix-tooltip>
  `
}

export const Positions = {
  render: () => `
    <div style="display:flex; gap:20px;">
      <ix-tooltip content="Top">
        <button>Top</button>
      </ix-tooltip>

      <ix-tooltip content="Bottom" data-position="bottom">
        <button>Bottom</button>
      </ix-tooltip>

      <ix-tooltip content="Left" data-position="left">
        <button>Left</button>
      </ix-tooltip>

      <ix-tooltip content="Right" data-position="right">
        <button>Right</button>
      </ix-tooltip>
    </div>
  `
}

export const IntentVariants = {
  render: () => `
    <div style="display:flex; gap:20px;">
      <ix-tooltip content="Danger" data-intent="danger">
        <button>Danger</button>
      </ix-tooltip>

      <ix-tooltip content="Success" data-intent="success">
        <button>Success</button>
      </ix-tooltip>

      <ix-tooltip content="Warning" data-intent="warning">
        <button>Warning</button>
      </ix-tooltip>
    </div>
  `
}