describe(
  'Grid Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/grid'
      )

    })

    it(
      'renders grid layout',
      () => {

        cy.get(
          '[data-grid]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders columns',
      () => {

        cy.get(
          '[data-grid="2"], [data-grid="3"], [data-grid="4"]'
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'supports auto layout',
      () => {

        cy.get(
          '[data-grid="auto"], [data-grid="fill"]'
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'supports gaps',
      () => {

        cy.get(
          '[data-gap]'
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'supports column spans',
      () => {

        cy.get(
          '[data-col]'
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'supports row spans',
      () => {

        cy.get(
          '[data-row]'
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'is responsive',
      () => {

        cy.viewport(
          375,
          667
        )

        cy.get(
          '[data-grid]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

  }
)