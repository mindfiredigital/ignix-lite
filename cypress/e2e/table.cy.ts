describe(
  'Table Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/table'
      )

      cy.window().then((win) => {
        return win.customElements.whenDefined('ix-table')
      })

    })

    it(
      'renders sortable table',
      () => {

        cy.get(
          'table[is="ix-table"] th[data-sortable]'
        )
        .should(
          'have.length.at.least',
          3
        )

      }
    )

    it(
      'sorts column on click',
      () => {

        cy.get(
          'table[is="ix-table"] th[data-sortable]'
        )
        .eq(1)
        .click()

        cy.get(
          'table[is="ix-table"] tbody tr'
        )
        .first()
        .should(
          'contain',
          'Alex'
        )

      }
    )

    it(
      'sorts via keyboard',
      () => {

        cy.get(
          'table[is="ix-table"] th[data-sortable]'
        )
        .eq(1)
        .trigger(
          'keydown',
          {
            key: 'Enter'
          }
        )

        cy.get(
          'table[is="ix-table"] tbody tr'
        )
        .first()
        .should(
          'contain',
          'Alex'
        )

      }
    )

  }
)