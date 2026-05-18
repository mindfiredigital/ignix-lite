describe(
  'Textarea Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/textarea'
        )

      }
    )

    it(
      'renders row variants',
      () => {

        cy.get(
          'textarea[rows="2"]'
        )
        .should(
          'exist'
        )

        cy.get(
          'textarea[rows="4"]'
        )
        .should(
          'exist'
        )

        cy.get(
          'textarea[rows="6"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports typing',
      () => {

        cy.get(
          'textarea:not(:disabled)'
        )
        .first()
        .as(
          'textarea'
        )

        cy.get(
          '@textarea'
        )
        .focus()

        cy.get(
          '@textarea'
        )
        .clear()

        cy.get(
          '@textarea'
        )
        .type(
          'Hello world'
        )

        cy.get(
          '@textarea'
        )
        .should(
          'have.value',
          'Hello world'
        )

      }
    )

    it(
      'supports enter key',
      () => {

        cy.get(
          'textarea:not(:disabled)'
        )
        .first()
        .as(
          'textarea'
        )

        cy.get(
          '@textarea'
        )
        .focus()

        cy.get(
          '@textarea'
        )
        .clear()

        cy.get(
          '@textarea'
        )
        .type(
          'Hello{enter}World'
        )

        cy.get(
          '@textarea'
        )
        .should(
          'have.value',
          'Hello\nWorld'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.get(
          'textarea:not(:disabled)'
        )
        .first()
        .focus()

        cy.focused()
        .should(
          'match',
          'textarea'
        )

      }
    )

    it(
      'supports primary intent',
      () => {

        cy.get(
          'textarea[data-intent="primary"]'
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
          'textarea[data-intent="success"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports warning intent',
      () => {

        cy.get(
          'textarea[data-intent="warning"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports danger intent',
      () => {

        cy.get(
          'textarea[data-intent="danger"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports required state',
      () => {

        cy.get(
          'textarea[required]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports invalid state',
      () => {

        cy.get(
          'textarea[aria-invalid="true"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports disabled state',
      () => {

        cy.get(
          'textarea:disabled'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders feedback section',
      () => {

        cy.contains(
          'Product Feedback'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders feedback textarea',
      () => {

        cy.get(
          'textarea[placeholder="Write your feedback..."]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports feedback typing',
      () => {

        cy.get(
          'textarea[placeholder="Write your feedback..."]'
        )
        .as(
          'feedback'
        )

        cy.get(
          '@feedback'
        )
        .focus()

        cy.get(
          '@feedback'
        )
        .clear()

        cy.get(
          '@feedback'
        )
        .type(
          'Great component library'
        )

        cy.get(
          '@feedback'
        )
        .should(
          'have.value',
          'Great component library'
        )

      }
    )

    it(
      'supports multiline feedback',
      () => {

        cy.get(
          'textarea[placeholder="Write your feedback..."]'
        )
        .as(
          'feedback'
        )

        cy.get(
          '@feedback'
        )
        .type(
          'Line 1{enter}Line 2{enter}Line 3'
        )

        cy.get(
          '@feedback'
        )
        .should(
          'have.value',
          'Line 1\nLine 2\nLine 3'
        )

      }
    )

    it(
      'supports tab navigation',
      () => {

        cy.get(
          'textarea:not(:disabled)'
        )
        .first()
        .focus()

        cy.focused()
        .should(
          'match',
          'textarea'
        )

      }
    )

    it(
      'validates rows attribute',
      () => {

        cy.get(
          'textarea[rows]'
        )
        .each(
          (
            $el
          ) => {

            expect(
              Number(
                $el.attr(
                  'rows'
                )
              )
            ).to.be.greaterThan(
              0
            )

          }
        )

      }
    )

  }
)