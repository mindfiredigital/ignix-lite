describe(
  'Accordion Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/accordion'
      )

    })

    it(
      'renders accordion',
      () => {

        cy.get(
          'details'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders summary element',
      () => {

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'toggles accordion on click',
      () => {

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .first()
        .click()

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .first()
        .parent()
        .should(
          'have.attr',
          'open'
        )

      }
    )

    it(
      'closes accordion on second click',
      () => {

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .first()
        .as(
          'accordion'
        )

        cy.get(
          '@accordion'
        )
        .click()

        cy.get(
          '@accordion'
        )
        .click()

        cy.get(
          '@accordion'
        )
        .parent()
        .should(
          'not.have.attr',
          'open'
        )

      }
    )

    it(
      'supports open by default state',
      () => {

        cy.contains(
          'summary',
          'How does this work?'
        )
        .parent()
        .should(
          'have.attr',
          'open'
        )

      }
    )

    it(
      'renders multiple accordions',
      () => {

        cy.get(
          'details'
        )
        .should(
          'have.length.at.least',
          5
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .first()
        .click()
        .should(
          'exist'
        )

      }
    )

    it(
      'supports enter key interaction',
      () => {

        cy.contains(
          'summary',
          'What is ignix-lite?'
        )
        .first()
        .as(
          'summary'
        )

        cy.get(
          '@summary'
        )
        .trigger(
          'keydown',
          {
            key: 'Enter'
          }
        )

        cy.get(
          '@summary'
        )
        .click()

        cy.get(
          '@summary'
        )
        .parent()
        .should(
          'have.attr',
          'open'
        )

      }
    )

    it(
      'supports space key interaction',
      () => {

        cy.contains(
          'summary',
          'Is the library lightweight?'
        )
        .as(
          'summary'
        )

        cy.get(
          '@summary'
        )
        .trigger(
          'keydown',
          {
            key: ' '
          }
        )

        cy.get(
          '@summary'
        )
        .click()

        cy.get(
          '@summary'
        )
        .parent()
        .should(
          'have.attr',
          'open'
        )

      }
    )

    it(
      'contains accordion content',
      () => {

        cy.contains(
          'lightweight semantic UI library'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'uses native details element',
      () => {

        cy.get(
          'details'
        )
        .first()
        .then(
          (
            el
          ) => {

            expect(
              el.prop(
                'tagName'
              )
            )
            .to.equal(
              'DETAILS'
            )

          }
        )

      }
    )

  }
)