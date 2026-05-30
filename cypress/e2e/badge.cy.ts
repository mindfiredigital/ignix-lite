describe(
  'Badge Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/badge'
      )

    })

    it(
      'renders badge component',
      () => {

        cy.get(
          'mark[data-intent]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports success intent',
      () => {

        cy.get(
          'mark[data-intent="success"]'
        )
        .should(
          'contain.text',
          'Success'
        )

      }
    )

    it(
      'supports danger intent',
      () => {

        cy.get(
          'mark[data-intent="danger"]'
        )
        .should(
          'contain.text',
          'Error'
        )

      }
    )

    it(
      'supports warning intent',
      () => {

        cy.get(
          'mark[data-intent="warning"]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'supports neutral intent',
      () => {

        cy.get(
          'mark[data-intent="neutral"]'
        )
        .should(
          'contain.text',
          'Neutral'
        )

      }
    )

    it(
      'supports status variant',
      () => {

        cy.get(
          'span[role="status"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports active status',
      () => {

        cy.contains(
          'span[role="status"]',
          'Active'
        )
        .should(
          'have.attr',
          'data-intent',
          'success'
        )

      }
    )

    it(
      'supports live status',
      () => {

        cy.contains(
          'span[role="status"]',
          'Live'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports pending status',
      () => {

        cy.contains(
          'span[role="status"]',
          'Pending'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'supports failed status',
      () => {

        cy.contains(
          'span[role="status"]',
          'Failed'
        )
        .should(
          'have.attr',
          'data-intent',
          'danger'
        )

      }
    )

    it(
      'supports long text badge',
      () => {

        cy.contains(
          'mark',
          'Very Long Badge Text'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'uses native mark element',
      () => {

        cy.get(
          'mark'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'MARK'
        )

      }
    )

    it(
      'uses native status element',
      () => {

        cy.get(
          'span[role="status"]'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'SPAN'
        )

      }
    )

    it(
      'supports all badge intents',
      () => {

        const intents = [
          'success',
          'danger',
          'warning',
          'neutral'
        ]

        intents.forEach(
          (
            intent
          ) => {

            cy.get(
              `[data-intent="${intent}"]`
            )
            .should(
              'exist'
            )

          }
        )

      }
    )

  }
)