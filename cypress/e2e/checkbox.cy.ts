describe(
  'Checkbox Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/checkbox'
      )

    })

    it(
      'renders checkbox inputs',
      () => {

        cy.get(
          'input[type="checkbox"]'
        )
        .should(
          'have.length.at.least',
          10
        )

      }
    )

    it(
      'supports checked state',
      () => {

        cy.contains(
          'label',
          'Checked'
        )
        .find(
          'input'
        )
        .should(
          'be.checked'
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
          'input'
        )
        .should(
          'be.disabled'
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
          'input'
        )
        .should(
          'have.attr',
          'required'
        )

      }
    )

    it(
      'supports success intent',
      () => {

        cy.contains(
          'label',
          'Success'
        )
        .should(
          'have.attr',
          'data-intent',
          'success'
        )

      }
    )

    it(
      'supports danger intent',
      () => {

        cy.contains(
          'label',
          'Danger'
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

        cy.contains(
          'label',
          'Warning'
        )
        .should(
          'have.attr',
          'data-intent',
          'warning'
        )

      }
    )

    it(
      'supports small size',
      () => {

        cy.contains(
          'label',
          'Small'
        )
        .should(
          'have.attr',
          'data-size',
          'sm'
        )

      }
    )

    it(
      'supports medium size',
      () => {

        cy.contains(
          'label',
          'Medium'
        )
        .should(
          'have.attr',
          'data-size',
          'md'
        )

      }
    )

    it(
      'supports large size',
      () => {

        cy.contains(
          'label',
          'Large'
        )
        .should(
          'have.attr',
          'data-size',
          'lg'
        )

      }
    )

    it(
      'supports checkbox group',
      () => {

        cy.get(
          'input[name="lang"]'
        )
        .should(
          'have.length',
          3
        )

      }
    )

    it(
      'supports click interaction',
      () => {

        cy.contains(
          'label',
          'Accept terms'
        )
        .find(
          'input'
        )
        .click()
        .should(
          'be.checked'
        )

      }
    )

    it(
      'supports uncheck interaction',
      () => {

        cy.contains(
          'label',
          'Checked'
        )
        .find(
          'input'
        )
        .uncheck()
        .should(
          'not.be.checked'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.contains(
          'label',
          'Accept terms'
        )
        .find(
          'input'
        )
        .as(
          'checkbox'
        )

        cy.get(
          '@checkbox'
        )
        .focus()

        cy.get(
          '@checkbox'
        )
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
          'Accept terms'
        )
        .find(
          'input'
        )
        .as(
          'checkbox'
        )

        cy.get(
          '@checkbox'
        )
        .focus()

        cy.get(
          '@checkbox'
        )
        .trigger(
          'keydown',
          {
            key: ' '
          }
        )

        cy.get(
          '@checkbox'
        )
        .click()

        cy.get(
          '@checkbox'
        )
        .should(
          'be.checked'
        )

      }
    )

    it(
      'uses native checkbox input',
      () => {

        cy.get(
          'input[type="checkbox"]'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'INPUT'
        )

      }
    )

    it(
      'renders labels correctly',
      () => {

        cy.get(
          'label'
        )
        .should(
          'have.length.at.least',
          8
        )

      }
    )

    it(
      'supports checkbox values',
      () => {

        cy.get(
          'input[value="js"]'
        )
        .should(
          'exist'
        )

        cy.get(
          'input[value="py"]'
        )
        .should(
          'exist'
        )

        cy.get(
          'input[value="java"]'
        )
        .should(
          'exist'
        )

      }
    )

  }
)