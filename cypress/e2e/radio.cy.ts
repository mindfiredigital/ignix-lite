describe(
  'Radio Component',
  () => {

    beforeEach(
      () => {

        cy.visit(
          'http://localhost:3000/ignix-lite/docs/components/radio'
        )

      }
    )

    it(
      'renders radio input',
      () => {

        cy.get(
          'input[type="radio"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports checked state',
      () => {

        cy.get(
          'input[name="checked-demo"]'
        )
        .should(
          'be.checked'
        )

      }
    )

    it(
      'supports disabled state',
      () => {

        cy.get(
          'input[type="radio"]:disabled'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports required group',
      () => {

        cy.get(
          'input[name="required-group"]'
        )
        .first()
        .should(
          'have.attr',
          'required'
        )

      }
    )

    it(
      'supports radio selection',
      () => {

        cy.get(
          'input[name="group-demo"][value="py"]'
        )
        .should(
          'be.checked'
        )

      }
    )

    it(
      'supports group switching',
      () => {

        cy.get(
          'input[name="group-demo"][value="py"]'
        )
        .should(
          'be.checked'
        )

        cy.get(
          'input[name="group-demo"][value="js"]'
        )
        .should(
          'not.be.checked'
        )

        cy.get(
          'input[name="group-demo"][value="java"]'
        )
        .should(
          'not.be.checked'
        )

      }
    )

    it(
      'supports intent variants',
      () => {

        cy.get(
          'label[data-intent]'
        )
        .should(
          'have.length.at.least',
          5
        )

      }
    )

    it(
      'supports sizes',
      () => {

        cy.get(
          'label[data-size]'
        )
        .should(
          'have.length',
          3
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.get(
          'input[type="radio"]:not(:disabled)'
        )
        .first()
        .focus()
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports space key interaction',
      () => {

        cy.contains(
          'label',
          'Starter Plan'
        )
        .find(
          'input[type="radio"]'
        )
        .should(
          'be.checked'
        )

        cy.contains(
          'label',
          'Pro Plan'
        )
        .find(
          'input[type="radio"]'
        )
        .should(
          'not.be.checked'
        )

      }
    )

    it(
      'supports enter key interaction',
      () => {

        cy.contains(
          'label',
          'Starter Plan'
        )
        .find(
          'input[type="radio"]'
        )
        .focus()
        .should(
          'be.focused'
        )

      }
    )

    it(
      'renders real world example',
      () => {

        cy.contains(
          'Starter Plan'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Pro Plan'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Enterprise Plan'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders continue button',
      () => {

        cy.contains(
          'button',
          'Continue'
        )
        .should(
          'exist'
        )

      }
    )

  }
)