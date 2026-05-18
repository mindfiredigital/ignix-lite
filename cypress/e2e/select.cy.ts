describe(
  'Select Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/select'
        )

      }
    )

    it(
      'supports primary intent',
      () => {

        cy.get(
          'select[data-intent="primary"]'
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
          'select[data-intent="danger"]'
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
          'select[data-intent="warning"]'
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
          'select[data-intent="success"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports neutral intent',
      () => {

        cy.get(
          'select[data-intent="neutral"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports disabled state',
      () => {

        cy.contains(
          'label',
          'Disabled'
        )
        .find(
          'select'
        )
        .should(
          'be.disabled'
        )

      }
    )

    it(
      'supports invalid state',
      () => {

        cy.contains(
          'label',
          'Invalid'
        )
        .find(
          'select'
        )
        .should(
          'have.attr',
          'aria-invalid',
          'true'
        )

      }
    )

    it(
      'supports required state',
      () => {

        cy.contains(
          'label',
          'Required'
        )
        .find(
          'select'
        )
        .should(
          'have.attr',
          'required'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.contains(
          'label',
          'Select Country'
        )
        .find(
          'select'
        )
        .focus()

        cy.focused()
        .should(
          'match',
          'select'
        )

      }
    )

    it(
      'supports option selection',
      () => {

        cy.contains(
          'label',
          'Select Country'
        )
        .find(
          'select'
        )
        .then(
          (
            $select
          ) => {

            $select.val(
              'USA'
            )

            $select.trigger(
              'change'
            )

          }
        )

        cy.contains(
          'label',
          'Select Country'
        )
        .find(
          'select'
        )
        .invoke(
          'val'
        )
        .should(
          'eq',
          'USA'
        )

      }
    )

    it(
      'supports multiple option selection',
      () => {

        cy.get(
          'select[multiple]'
        )
        .then(
          (
            $select
          ) => {

            $select.val(
              [
                'JavaScript',
                'Python'
              ]
            )

            $select.trigger(
              'change'
            )

          }
        )

        cy.get(
          'select[multiple]'
        )
        .invoke(
          'val'
        )
        .should(
          'deep.equal',
          [
            'JavaScript',
            'Python'
          ]
        )

      }
    )

    it(
      'renders country options',
      () => {

        cy.contains(
          'label',
          'Select Country'
        )
        .find(
          'option'
        )
        .should(
          'have.length',
          4
        )

      }
    )

    it(
      'renders technology options',
      () => {

        cy.get(
          'select[multiple]'
        )
        .find(
          'option'
        )
        .should(
          'have.length',
          4
        )

      }
    )

  }
)