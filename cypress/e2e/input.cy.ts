describe(
  'Input Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/input'
        )

      }
    )

    it(
      'supports typing text',
      () => {

        cy.get(
          'input[type="text"]:not(:disabled)'
        )
        .first()
        .as(
          'textInput'
        )

        cy.get(
          '@textInput'
        )
        .focus()

        cy.get(
          '@textInput'
        )
        .clear()

        cy.get(
          '@textInput'
        )
        .type(
          'John Doe'
        )

        cy.get(
          '@textInput'
        )
        .should(
          'have.value',
          'John Doe'
        )

      }
    )

    it(
      'supports primary intent',
      () => {

        cy.get(
          'input[data-intent="primary"]'
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
          'input[data-intent="danger"]'
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
          'input[data-intent="warning"]'
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
          'input[data-intent="success"]'
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
          'input[data-intent="neutral"]'
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
          'input:disabled'
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
          'input[aria-invalid="true"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders email input',
      () => {

        cy.get(
          'input[type="email"]:not(:disabled)'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'renders password input',
      () => {

        cy.get(
          'input[type="password"]:not(:disabled)'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'renders number input',
      () => {

        cy.get(
          'input[type="number"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders date input',
      () => {

        cy.get(
          'input[type="date"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders search input',
      () => {

        cy.get(
          'input[type="search"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.get(
          'input[type="text"]:not(:disabled)'
        )
        .first()
        .focus()
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports enter key',
      () => {

        cy.get(
          'input[type="text"]:not(:disabled)'
        )
        .first()
        .as(
          'textInput'
        )

        cy.get(
          '@textInput'
        )
        .focus()

        cy.get(
          '@textInput'
        )
        .clear()

        cy.get(
          '@textInput'
        )
        .type(
          'Hello'
        )

        cy.get(
          '@textInput'
        )
        .should(
          'have.value',
          'Hello'
        )

        cy.get(
          '@textInput'
        )
        .type(
          '{enter}'
        )

        cy.get(
          '@textInput'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports tab navigation',
      () => {

        cy.get(
          'input[type="text"]:not(:disabled)'
        )
        .first()
        .focus()

        cy.get(
          'input[type="email"]:not(:disabled)'
        )
        .first()
        .focus()
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports email typing',
      () => {

        cy.get(
          'input[type="email"]:not(:disabled)'
        )
        .first()
        .as(
          'emailInput'
        )

        cy.get(
          '@emailInput'
        )
        .clear()

        cy.get(
          '@emailInput'
        )
        .type(
          'john@example.com'
        )

        cy.get(
          '@emailInput'
        )
        .should(
          'have.value',
          'john@example.com'
        )

      }
    )

    it(
      'supports password typing',
      () => {

        cy.get(
          'input[type="password"]:not(:disabled)'
        )
        .first()
        .as(
          'passwordInput'
        )

        cy.get(
          '@passwordInput'
        )
        .clear()

        cy.get(
          '@passwordInput'
        )
        .type(
          'password123'
        )

        cy.get(
          '@passwordInput'
        )
        .should(
          'have.value',
          'password123'
        )

      }
    )

  }
)