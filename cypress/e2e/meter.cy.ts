describe(
  'Meter Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/meter'
        )

      }
    )

    it(
      'renders meter elements',
      () => {

        cy.get(
          'meter'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

    it(
      'supports low value meter',
      () => {

        cy.get(
          'meter'
        )
        .eq(
          0
        )
        .should(
          'have.attr',
          'value',
          '20'
        )

      }
    )

    it(
      'supports medium value meter',
      () => {

        cy.get(
          'meter'
        )
        .eq(
          1
        )
        .should(
          'have.attr',
          'value',
          '50'
        )

      }
    )

    it(
      'supports high value meter',
      () => {

        cy.get(
          'meter'
        )
        .eq(
          2
        )
        .should(
          'have.attr',
          'value',
          '90'
        )

      }
    )

    it(
      'supports min attribute',
      () => {

        cy.get(
          'meter'
        )
        .first()
        .should(
          'have.attr',
          'min',
          '0'
        )

      }
    )

    it(
      'supports max attribute',
      () => {

        cy.get(
          'meter'
        )
        .first()
        .should(
          'have.attr',
          'max',
          '100'
        )

      }
    )

    it(
      'supports low threshold',
      () => {

        cy.get(
          'meter'
        )
        .first()
        .should(
          'have.attr',
          'low',
          '30'
        )

      }
    )

    it(
      'supports high threshold',
      () => {

        cy.get(
          'meter'
        )
        .first()
        .should(
          'have.attr',
          'high',
          '70'
        )

      }
    )

    it(
      'supports optimum value',
      () => {

        cy.get(
          'meter'
        )
        .first()
        .should(
          'have.attr',
          'optimum',
          '100'
        )

      }
    )

    it(
      'renders usage example',
      () => {

        cy.contains(
          'Storage Usage'
        )
        .should(
          'exist'
        )

        cy.contains(
          '68% used'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports usage meter value',
      () => {

        cy.get(
          'meter[value="68"]'
        )
        .should(
          'exist'
        )
        .and(
          'have.attr',
          'value',
          '68'
        )

      }
    )

  }
)