describe(
  'Button Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/button'
      )

    })

    it(
      'renders button component',
      () => {

        cy.get(
          'button'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders primary button',
      () => {

        cy.get(
          'button[data-intent="primary"]'
        )
        .contains(
          'Primary'
        )

      }
    )

    it(
      'renders danger button',
      () => {

        cy.get(
          'button[data-intent="danger"]'
        )
        .contains(
          'Danger'
        )

      }
    )

    it(
      'renders warning button',
      () => {

        cy.get(
          'button[data-intent="warning"]'
        )
        .contains(
          'Warning'
        )

      }
    )

    it(
      'renders success button',
      () => {

        cy.get(
          'button[data-intent="success"]'
        )
        .contains(
          'Success'
        )

      }
    )

    it(
      'renders neutral button',
      () => {

        cy.get(
          'button[data-intent="neutral"]'
        )
        .contains(
          'Neutral'
        )

      }
    )

    it(
      'renders ghost button',
      () => {

        cy.get(
          'button[data-intent="ghost"]'
        )
        .contains(
          'Ghost'
        )

      }
    )

    it(
      'supports disabled state',
      () => {

        cy.get(
          'button:disabled'
        )
        .should(
          'exist'
        )
        .and(
          'contain.text',
          'Disabled'
        )

      }
    )

    it(
      'supports loading state',
      () => {

        cy.get(
          'button[aria-busy="true"]'
        )
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
      'supports click interaction',
      () => {

        cy.contains(
          'button',
          'Save Changes'
        )
        .click()

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.contains(
          'button',
          'Save Changes'
        )
        .focus()
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports enter key',
      () => {

        cy.contains(
          'button',
          'Save Changes'
        )
        .as(
          'saveBtn'
        )

        cy.get(
          '@saveBtn'
        )
        .focus()

        cy.get(
          '@saveBtn'
        )
        .type(
          '{enter}'
        )

        cy.get(
          '@saveBtn'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports space key',
      () => {

        cy.contains(
          'button',
          'Save Changes'
        )
        .as(
          'saveBtn'
        )

        cy.get(
          '@saveBtn'
        )
        .focus()

        cy.get(
          '@saveBtn'
        )
        .type(
          ' '
        )

        cy.get(
          '@saveBtn'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'has no class attribute',
      () => {

        cy.contains(
          'button',
          'Primary'
        )
        .should(
          'not.have.attr',
          'class'
        )

      }
    )

    it(
      'uses native button element',
      () => {

        cy.contains(
          'button',
          'Save Changes'
        )
        .then(
          (
            btn
          ) => {

            expect(
              btn.prop(
                'tagName'
              )
            )
            .to.equal(
              'BUTTON'
            )

          }
        )

      }
    )

  }
)