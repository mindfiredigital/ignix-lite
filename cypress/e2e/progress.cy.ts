describe(
  'Progress Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/progress'
        )

      }
    )

    it(
      'renders progress elements',
      () => {

        cy.get(
          'progress'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

    it(
      'supports empty progress',
      () => {

        cy.get(
          'progress'
        )
        .eq(
          0
        )
        .should(
          'have.attr',
          'value',
          '0'
        )

      }
    )

    it(
      'supports partial progress',
      () => {

        cy.get(
          'progress'
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
      'supports completed progress',
      () => {

        cy.get(
          'progress'
        )
        .eq(
          2
        )
        .should(
          'have.attr',
          'value',
          '100'
        )

      }
    )

    it(
      'supports max attribute',
      () => {

        cy.get(
          'progress'
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
      'renders usage example',
      () => {

        cy.contains(
          'Upload Progress'
        )
        .should(
          'exist'
        )

        cy.contains(
          '72% completed'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports usage progress value',
      () => {

        cy.get(
          'progress[value="72"]'
        )
        .should(
          'exist'
        )
        .and(
          'have.attr',
          'value',
          '72'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.get(
          'progress'
        )
        .first()
        .invoke(
          'attr',
          'tabindex',
          '0'
        )

        cy.get(
          'progress'
        )
        .first()
        .focus()
        .should(
          'be.focused'
        )

      }
    )

  }
)