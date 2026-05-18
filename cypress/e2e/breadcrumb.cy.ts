describe(
  'Breadcrumb Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/breadcrumb'
      )

    })

    it(
      'renders breadcrumb',
      () => {

        cy.get(
          "nav[aria-label='Breadcrumb']"
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'shows breadcrumb items',
      () => {

        cy.get(
          "nav[aria-label='Breadcrumb'] li"
        )
        .should(
          'have.length.at.least',
          2
        )

      }
    )

    it(
      'has active page item',
      () => {

        cy.get(
          "nav[aria-label='Breadcrumb'] [aria-current='page']"
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders links',
      () => {

        cy.get(
          "nav[aria-label='Breadcrumb'] a"
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

    it(
      'supports styles',
      () => {

        cy.get(
          "nav[aria-label='Breadcrumb'][data-style]"
        )
        .should(
          'have.length.at.least',
          1
        )

      }
    )

  }
)