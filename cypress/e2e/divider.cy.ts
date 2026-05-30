describe(
  'Divider Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/divider'
      )

    })

    it(
      'renders divider elements',
      () => {

        cy.get(
          'hr'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

    it(
      'supports default horizontal divider',
      () => {

        cy.get(
          'hr:not([data-orientation])'
        )
        .should(
          'have.length.at.least',
          2
        )

      }
    )

    it(
      'supports vertical orientation',
      () => {

        cy.get(
          'hr[data-orientation="vertical"]'
        )
        .should(
          'have.length',
          2
        )

      }
    )

    it(
      'has correct orientation attribute',
      () => {

        cy.get(
          'hr[data-orientation="vertical"]'
        )
        .first()
        .should(
          'have.attr',
          'data-orientation',
          'vertical'
        )

      }
    )

    it(
      'uses native hr element',
      () => {

        cy.get(
          'hr'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'HR'
        )

      }
    )

    it(
      'renders vertical example content',
      () => {

        cy.contains(
          'Home'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Docs'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Components'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders three items around dividers',
      () => {

        cy.contains(
          'Home'
        )
        .parent()
        .find(
          'span'
        )
        .should(
          'have.length',
          3
        )

      }
    )

    it(
      'places dividers between items',
      () => {

        cy.contains(
          'Home'
        )
        .parent()
        .find(
          'hr[data-orientation="vertical"]'
        )
        .should(
          'have.length',
          2
        )

      }
    )

    it(
      'shows visible divider',
      () => {

        cy.get(
          'hr'
        )
        .first()
        .should(
          'be.visible'
        )

      }
    )

    it(
      'supports semantic separation',
      () => {

        cy.get(
          'hr'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

  }
)