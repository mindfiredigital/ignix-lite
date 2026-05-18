describe(
  'Dialog Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/dialog'
      )

    })

    it(
      'opens dialog',
      () => {

        cy.contains(
          'Delete Item'
        )
        .click()

        cy.get(
          '#danger-dialog'
        )
        .should(
          'have.attr',
          'open'
        )

      }
    )

    it(
      'closes dialog',
      () => {

        cy.contains(
          'Delete Item'
        )
        .click()

        cy.get(
          '#danger-dialog'
        )
        .within(() => {

          cy.contains(
            'Cancel'
          )
          .click()

        })

        cy.get(
          '#danger-dialog'
        )
        .should(
          'not.have.attr',
          'open'
        )

      }
    )

    it(
      'applies danger intent',
      () => {

        cy.get(
          '#danger-dialog'
        )
        .should(
          'have.attr',
          'data-intent',
          'danger'
        )

      }
    )

    it(
      'shows action buttons',
      () => {

        cy.get(
          '#danger-dialog [data-actions] button'
        )
        .should(
          'have.length',
          2
        )

      }
    )

    it(
      'supports warning intent',
      () => {

        cy.get(
          '#warning-dialog'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'supports info intent',
      () => {

        cy.get(
          '#info-dialog'
        )
        .should(
          'have.attr',
          'data-intent',
          'info'
        )

      }
    )

  }
)