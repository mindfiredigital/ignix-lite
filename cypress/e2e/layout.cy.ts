describe('Layout Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/ignix-lite/docs/components/layout')
  })

  it('renders app shell and regions', () => {
    cy.get('[data-layout="app-shell"]').should('exist')
    cy.get('[data-region="header"]').should('exist')
    cy.get('[data-region="sidebar"]').should('exist')
    cy.get('[data-region="main"]').should('exist')
    cy.get('[data-region="footer"]').should('exist')
  })

  it('renders box and container layout structure', () => {
    cy.get('[data-layout="container"]').should('exist')
    cy.get('[data-layout="section"]').should('exist')
    cy.get('[data-layout="box"]').should('exist')
  })

  it('renders flex layouts (stack, inline, cluster, split, sidebar)', () => {
    cy.get('[data-layout="stack"]').should('exist')
    cy.get('[data-layout="inline"]').should('exist')
    cy.get('[data-layout="cluster"]').should('exist')
    cy.get('[data-layout="split"]').should('exist')
    cy.get('[data-layout="sidebar"]').should('exist')
  })

  it('renders grid, auto-grid, masonry, aspect layouts', () => {
    cy.get('[data-layout="grid"]').should('exist')
    cy.get('[data-layout="auto-grid"]').should('exist')
    cy.get('[data-layout="masonry"]').should('exist')
    cy.get('[data-layout="aspect"]').should('exist')
  })

  it('renders form and field-group layouts', () => {
    cy.get('[data-layout="form"]').should('exist')
    cy.get('[data-layout="field-group"]').should('exist')
  })

  it('renders spacer elements', () => {
    cy.get('[data-layout="spacer"]').should('exist')
  })

  it('renders absolute/fixed pinned position helper elements', () => {
    cy.get('[data-pin]').should('exist')
    cy.get('[data-position]').should('exist')
  })

  it('handles viewport changes and remains responsive', () => {
    cy.viewport(375, 667)
    cy.get('[data-layout="app-shell"]').should('exist')
    cy.get('[data-layout="stack"]').should('exist')
  })
})
