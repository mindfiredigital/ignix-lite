describe(
  'Table Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/table'
      )

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
        .first()
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
        .first()
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