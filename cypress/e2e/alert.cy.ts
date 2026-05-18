describe(
  'Alert Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/alert'
      )

    })

    it(
      'renders alert component',
      () => {

        cy.get(
          'aside[data-intent]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders danger alert',
      () => {

        cy.get(
          'aside[data-intent="danger"]'
        )
        .contains(
          'Something went wrong'
        )

      }
    )

    it(
      'renders warning alert',
      () => {

        cy.get(
          'aside[data-intent="warning"]'
        )
        .contains(
          'Your session will expire soon'
        )

      }
    )

    it(
      'renders success alert',
      () => {

        cy.get(
          'aside[data-intent="success"]'
        )
        .contains(
          'Saved successfully'
        )

      }
    )

    it(
      'renders info alert',
      () => {

        cy.get(
          'aside[data-intent="info"]'
        )
        .contains(
          'New updates are available'
        )

      }
    )

    it(
      'supports danger intent',
      () => {

        cy.get(
          'aside[data-intent="danger"]'
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

        cy.get(
          'aside[data-intent="warning"]'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'supports success intent',
      () => {

        cy.get(
          'aside[data-intent="success"]'
        )
        .should(
          'have.attr',
          'data-intent',
          'success'
        )

      }
    )

    it(
      'supports info intent',
      () => {

        cy.get(
          'aside[data-intent="info"]'
        )
        .should(
          'have.attr',
          'data-intent',
          'info'
        )

      }
    )

    it(
      'renders all variants',
      () => {

        cy.get(
          'aside[data-intent]'
        )
        .should(
          'have.length.at.least',
          5
        )

      }
    )

    it(
      'renders real world example',
      () => {

        cy.contains(
          'Unsaved changes detected'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'uses native aside element',
      () => {

        cy.get(
          'aside'
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
              'ASIDE'
            )

          }
        )

      }
    )

  }
)