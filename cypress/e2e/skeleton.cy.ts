describe(
  'Skeleton Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/skeleton'
        )

      }
    )

    it(
      'renders text skeleton',
      () => {

        cy.get(
          'span[data-shape="text"]'
        )
        .first()
        .should(
          'exist'
        )
        .and(
          'have.attr',
          'aria-busy',
          'true'
        )

      }
    )

    it(
      'renders rectangle skeleton',
      () => {

        cy.get(
          'span[data-shape="rect"]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'renders circle skeleton',
      () => {

        cy.get(
          'span[data-shape="circle"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports status role',
      () => {

        cy.get(
          'span[role="status"]'
        )
        .should(
          'have.length.greaterThan',
          0
        )

      }
    )

    it(
      'supports aria busy state',
      () => {

        cy.get(
          'span[aria-busy="true"]'
        )
        .should(
          'have.length.greaterThan',
          0
        )

      }
    )

    it(
      'renders loading text label',
      () => {

        cy.get(
          'span[aria-label="loading text"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders loading rectangle label',
      () => {

        cy.get(
          'span[aria-label="loading rectangle"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders loading avatar label',
      () => {

        cy.get(
          'span[aria-label="loading avatar"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders multiple loading lines',
      () => {

        cy.get(
          'span[aria-label="loading line"]'
        )
        .should(
          'have.length.at.least',
          3
        )

      }
    )

    it(
      'renders loading banner',
      () => {

        cy.contains(
          'Loading Banner'
        )
        .should(
          'exist'
        )

        cy.get(
          'span[aria-label="loading banner"]'
        )
        .should(
          'exist'
        )
        .and(
          'have.attr',
          'data-shape',
          'rect'
        )

      }
    )

    it(
      'supports loading banner accessibility',
      () => {

        cy.get(
          'span[aria-label="loading banner"]'
        )
        .should(
          'have.attr',
          'role',
          'status'
        )
        .and(
          'have.attr',
          'aria-busy',
          'true'
        )

      }
    )

    it(
      'validates shapes',
      () => {

        cy.get(
          'span[data-shape]'
        )
        .each(
          (
            $el
          ) => {

            expect(
              $el.attr(
                'data-shape'
              )
            ).to.be.oneOf(
              [
                'text',
                'rect',
                'circle'
              ]
            )

          }
        )

      }
    )

  }
)