describe(
  'Toast Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/toast'
      )

    })

    it(
      'renders toast container',
      () => {

        cy.get(
          '#intent-toast'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'shows success toast',
      () => {

        cy.contains(
          'Success'
        )
        .click()

        cy.get(
          '#intent-toast aside'
        )
        .should(
          'exist'
        )

        cy.get(
          '#intent-toast aside'
        )
        .should(
          'have.attr',
          'data-intent',
          'success'
        )

      }
    )

    it(
      'shows warning toast',
      () => {

        cy.contains(
          'Warning'
        )
        .click()

        cy.get(
          '#intent-toast aside'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'has accessibility role',
      () => {

        cy.contains(
          'Danger'
        )
        .click()

        cy.get(
          '#intent-toast aside'
        )
        .should(
          'have.attr',
          'role',
          'status'
        )

      }
    )

    it(
      'supports motion variants',
      () => {

        cy.contains(
          'Slide'
        )
        .click()

        cy.get(
          '#motion-toast aside'
        )
        .should(
          'have.attr',
          'data-variant',
          'slide'
        )

      }
    )

    it(
      'supports positions',
      () => {

        cy.get(
          '#top-left-toast'
        )
        .should(
          'have.attr',
          'data-position',
          'top-left'
        )

        cy.get(
          '#bottom-right-toast'
        )
        .should(
          'have.attr',
          'data-position',
          'bottom-right'
        )

      }
    )

  }
)