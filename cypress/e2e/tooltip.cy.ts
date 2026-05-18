describe(
  'Tooltip Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/tooltip'
      )

    })

    it(
      'renders tooltip component',
      () => {

        cy.get(
          'ix-tooltip'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'applies default tooltip role',
      () => {

        cy.contains(
          'Default'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'role',
          'tooltip'
        )

      }
    )

    it(
      'adds tabindex automatically',
      () => {

        cy.contains(
          'Default'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'tabindex',
          '0'
        )

      }
    )

    it(
      'supports top position',
      () => {

        cy.contains(
          'Top'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-position',
          'top'
        )

      }
    )

    it(
      'supports bottom position',
      () => {

        cy.contains(
          'Bottom'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-position',
          'bottom'
        )

      }
    )

    it(
      'supports left position',
      () => {

        cy.contains(
          'Left'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-position',
          'left'
        )

      }
    )

    it(
      'supports right position',
      () => {

        cy.contains(
          'Right'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-position',
          'right'
        )

      }
    )

    it(
      'supports success intent',
      () => {

        cy.contains(
          'Success'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-intent',
          'success'
        )

      }
    )

    it(
      'supports danger intent',
      () => {

        cy.contains(
          'Danger'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-intent',
          'danger'
        )

      }
    )

    it(
      'supports warning intent',
      () => {

        cy.contains(
          'Warning'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'shows content attribute',
      () => {

        cy.contains(
          'Default'
        )
        .parents(
          'ix-tooltip'
        )
        .should(
          'have.attr',
          'content',
          'Default tooltip'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.contains(
          'Default'
        )
        .focus()

        cy.focused()
        .should(
          'contain.text',
          'Default'
        )

      }
    )

    it(
      'contains button trigger',
      () => {

        cy.get(
          'ix-tooltip button'
        )
        .should(
          'have.length.greaterThan',
          0
        )

      }
    )

  }
)