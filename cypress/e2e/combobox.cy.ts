describe(
  'Combobox Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/combobox'
      )

    })

    it(
      'renders combobox',
      () => {

        cy.get(
          'ix-combobox'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'filters options',
      () => {

        cy.get(
          'ix-combobox'
        )
        .first()
        .within(() => {

          cy.get(
            'input'
          )
          .type(
            'Ap'
          )

        })

        cy.contains(
          'Apple'
        )

      }
    )

    it(
      'selects option',
      () => {

        cy.get(
          'ix-combobox'
        )
        .first()
        .within(() => {

          cy.get(
            'input'
          )
          .click()

        })

        cy.contains(
          'Apple'
        )
        .click()

      }
    )

    it(
      'clears selection',
      () => {

        cy.get(
          'ix-combobox'
        )
        .first()
        .within(() => {

          cy.get(
            'input'
          )
          .click()

        })

        cy.contains(
          'Apple'
        )
        .click()

        cy.get(
          'ix-combobox'
        )
        .first()
        .within(() => {

          cy.get(
            'button[data-clear]'
          )
          .click()

        })

      }
    )

  }
)