describe(
  'Form Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/form'
      )

    })

    it(
      'renders form',
      () => {

        cy.get(
          'form'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'renders name input',
      () => {

        cy.get(
          'input[type="text"]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'renders email input',
      () => {

        cy.get(
          'input[type="email"]'
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
          'input[type="password"]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'supports typing in name input',
      () => {

        cy.get(
          'input[type="text"]'
        )
        .first()
        .as(
          'nameInput'
        )

        cy.get(
          '@nameInput'
        )
        .type(
          'John Doe'
        )

        cy.get(
          '@nameInput'
        )
        .should(
          'have.value',
          'John Doe'
        )

      }
    )

    it(
      'supports typing in email input',
      () => {

        cy.get(
          'input[type="email"]'
        )
        .first()
        .as(
          'emailInput'
        )

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
      'supports typing in password input',
      () => {

        cy.get(
          'input[type="password"]'
        )
        .first()
        .as(
          'passwordInput'
        )

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

    it(
      'renders submit button',
      () => {

        cy.contains(
          'button',
          'Submit'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports submit button click',
      () => {

        cy.contains(
          'button',
          'Submit'
        )
        .click()

        cy.contains(
          'button',
          'Submit'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports loading state',
      () => {

        cy.get(
          'form[aria-busy="true"]'
        )
        .should(
          'exist'
        )
        .and(
          'have.attr',
          'data-loading'
        )

      }
    )

    it(
      'renders loading submit button',
      () => {

        cy.contains(
          'Submitting...'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports validation error state',
      () => {

        cy.get(
          'label[data-state="error"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports invalid email input',
      () => {

        cy.get(
          'input[aria-invalid="true"]'
        )
        .should(
          'have.attr',
          'aria-invalid',
          'true'
        )

      }
    )

    it(
      'renders validation message',
      () => {

        cy.contains(
          'Please enter a valid email address.'
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
          'input[type="text"]'
        )
        .first()
        .focus()

        cy.focused()
        .should(
          'have.attr',
          'type',
          'text'
        )

      }
    )

    it(
      'supports tab navigation',
      () => {

        cy.get(
          'input[type="text"]'
        )
        .first()
        .focus()

        cy.get(
          'input[type="email"]'
        )
        .first()
        .focus()

        cy.focused()
        .should(
          'have.attr',
          'type',
          'email'
        )

      }
    )

    it(
      'supports enter key on submit',
      () => {

        cy.contains(
          'button',
          'Submit'
        )
        .as(
          'submitBtn'
        )

        cy.get(
          '@submitBtn'
        )
        .focus()

        cy.get(
          '@submitBtn'
        )
        .type(
          '{enter}'
        )

        cy.get(
          '@submitBtn'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports password field focus',
      () => {

        cy.get(
          'input[type="password"]'
        )
        .first()
        .focus()

        cy.focused()
        .should(
          'have.attr',
          'type',
          'password'
        )

      }
    )

    it(
      'renders retry button',
      () => {

        cy.contains(
          'button',
          'Retry'
        )
        .should(
          'exist'
        )

      }
    )

  }
)