const meta = {
  title: 'Components/Grid',
}

export default meta

const box = (label: string) =>
  `<article style="background:var(--ix-primary-bg);color:var(--ix-primary);padding:var(--ix-space-md);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">${label}</article>`

const spanBox = (label: string, col: string, bg: string, color: string) =>
  `<article data-col="${col}" style="background:var(--ix-${bg}-bg);color:var(--ix-${color});padding:var(--ix-space-md);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">${label}</article>`

export const Default  = {
  render: () => `
    <section data-grid="2">
      ${box('Column 1')}
      ${box('Column 2')}
    </section>
  `,
}

export const ThreeColumn  = {
  render: () => `
    <section data-grid="3">
      ${box('Column 1')}
      ${box('Column 2')}
      ${box('Column 3')}
    </section>
  `,
}

export const FourColumn  = {
  render: () => `
    <section data-grid="4">
      ${box('Column 1')}
      ${box('Column 2')}
      ${box('Column 3')}
      ${box('Column 4')}
    </section>
  `,
}

export const FiveColumn  = {
  render: () => `
    <section data-grid="5">
      ${box('Col 1')}
      ${box('Col 2')}
      ${box('Col 3')}
      ${box('Col 4')}
      ${box('Col 5')}
    </section>
  `,
}

export const SixColumn  = {
  render: () => `
    <section data-grid="6">
      ${box('Col 1')}
      ${box('Col 2')}
      ${box('Col 3')}
      ${box('Col 4')}
      ${box('Col 5')}
      ${box('Col 6')}
    </section>
  `,
}

export const AutoFit  = {
  render: () => `
    <section data-grid="auto">
      ${box('Item 1')}
      ${box('Item 2')}
      ${box('Item 3')}
      ${box('Item 4')}
      ${box('Item 5')}
    </section>
  `,
}

export const AutoFill  = {
  render: () => `
    <section data-grid="fill">
      ${box('Item 1')}
      ${box('Item 2')}
      ${box('Item 3')}
    </section>
  `,
}

export const GapXs  = {
  render: () => `
    <section data-grid="3" data-gap="xs">
      ${box('A')} ${box('B')} ${box('C')}
    </section>
  `,
}

export const GapSm  = {
  render: () => `
    <section data-grid="3" data-gap="sm">
      ${box('A')} ${box('B')} ${box('C')}
    </section>
  `,
}

export const GapLg  = {
  render: () => `
    <section data-grid="3" data-gap="lg">
      ${box('A')} ${box('B')} ${box('C')}
    </section>
  `,
}

export const GapXl  = {
  render: () => `
    <section data-grid="3" data-gap="xl">
      ${box('A')} ${box('B')} ${box('C')}
    </section>
  `,
}

export const AlignCenter  = {
  render: () => `
    <section data-grid="3" data-align="center">
      <article style="background:var(--ix-primary-bg);color:var(--ix-primary);padding:var(--ix-space-lg);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">Tall</article>
      ${box('Short')}
      <article style="background:var(--ix-primary-bg);color:var(--ix-primary);padding:var(--ix-space-lg) var(--ix-space-md);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">Medium</article>
    </section>
  `,
}

export const AlignEnd  = {
  render: () => `
    <section data-grid="3" data-align="end">
      <article style="background:var(--ix-primary-bg);color:var(--ix-primary);padding:var(--ix-space-lg);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">Tall</article>
      ${box('Short')}
      <article style="background:var(--ix-primary-bg);color:var(--ix-primary);padding:var(--ix-space-lg) var(--ix-space-md);border-radius:var(--ix-radius);font-size:var(--ix-size-sm);font-family:var(--ix-font);font-weight:600;text-align:center;">Medium</article>
    </section>
  `,
}

export const ColSpan  = {
  render: () => `
    <section data-grid="4">
      ${spanBox('Span 2', '2', 'primary', 'primary')}
      ${box('Col')}
      ${box('Col')}
      ${box('Col')}
      ${box('Col')}
      ${box('Col')}
    </section>
  `,
}

export const ColFull  = {
  render: () => `
    <section data-grid="3">
      ${box('Col 1')}
      ${box('Col 2')}
      ${box('Col 3')}
      ${spanBox('Full Width', 'full', 'success', 'success')}
    </section>
  `,
}

export const RowSpan  = {
  render: () => `
    <section data-grid="3">
      ${spanBox('Row Span 2', '2', 'warning', 'warning')}
      ${box('B')}
      ${box('C')}
      ${box('D')}
      ${box('E')}
    </section>
  `,
}

export const Dense  = {
  render: () => `
    <section data-grid="4" data-dense>
      ${spanBox('Wide', '2', 'primary', 'primary')}
      ${box('A')}
      ${box('B')}
      ${box('C')}
      ${spanBox('Wider', '3', 'success', 'success')}
      ${box('D')}
    </section>
  `,
}

export const MixedSpans  = {
  render: () => `
    <section data-grid="6" data-gap="sm">
      ${spanBox('Span 3', '3', 'primary', 'primary')}
      ${spanBox('Span 2', '2', 'success', 'success')}
      ${box('1')}
      ${spanBox('Full', 'full', 'warning', 'warning')}
    </section>
  `,
}