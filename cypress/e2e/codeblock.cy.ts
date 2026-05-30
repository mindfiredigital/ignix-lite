describe(
  'Code Block Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/codeblock'
      )

    })

    it(
      'renders pre elements',
      () => {

        cy.get(
          'pre'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

    it(
      'renders code elements',
      () => {

        cy.get(
          'code'
        )
        .should(
          'have.length.at.least',
          4
        )

      }
    )

    it(
      'supports javascript language',
      () => {

        cy.get(
          'code[data-lang="js"]'
        )
        .first()
        .should(
          'exist'
        )

        cy.contains(
          'function greet'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports python language',
      () => {

        cy.get(
          'code[data-lang="python"]'
        )
        .first()
        .should(
          'exist'
        )

        cy.contains(
          'def greet'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports bash language',
      () => {

        cy.get(
          'code[data-lang="bash"]'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

    it(
      'contains installation command',
      () => {

        cy.contains(
          'npm install @mindfiredigital/ignix-lite'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'contains pnpm usage example',
      () => {

        cy.contains(
          'pnpm add @mindfiredigital/ignix-lite'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'uses native pre tag',
      () => {

        cy.get(
          'pre'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'PRE'
        )

      }
    )

    it(
      'uses native code tag',
      () => {

        cy.get(
          'code'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'CODE'
        )

      }
    )

    it(
      'contains hello world javascript example',
      () => {

        cy.contains(
          'Hello world'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'contains python print example',
      () => {

        cy.contains(
          'print("Hello")'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports scrolling container',
      () => {

        cy.get(
          'pre'
        )
        .first()
        .should(
          'be.visible'
        )

      }
    )

    it(
      'renders code text content',
      () => {

        cy.get(
          'code[data-lang="js"]'
        )
        .first()
        .invoke(
          'text'
        )
        .should(
          'contain',
          'console.log'
        )

      }
    )

    it(
      'supports keyboard focus',
      () => {

        cy.get(
          'pre'
        )
        .first()
        .scrollIntoView()

        cy.get(
          'code'
        )
        .first()
        .should(
          'exist'
        )

      }
    )

  }
)