describe(
  'Card Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/card'
      )

    })

    it(
      'renders card component',
      () => {

        cy.get(
          'article'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders avatar image',
      () => {

        cy.get(
          '[slot="avatar"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders title slot',
      () => {

        cy.get(
          '[slot="title"]'
        )
        .first()
        .should(
          'contain.text',
          'Neha Sharma'
        )

      }
    )

    it(
      'renders meta slot',
      () => {

        cy.get(
          '[slot="meta"]'
        )
        .first()
        .should(
          'contain.text',
          'Frontend Developer'
        )

      }
    )

    it(
      'renders body slot',
      () => {

        cy.get(
          '[slot="body"]'
        )
        .first()
        .should(
          'contain.text',
          'Building accessible UI components'
        )

      }
    )

    it(
      'renders action button',
      () => {

        cy.contains(
          'button',
          'Follow'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders footer slot',
      () => {

        cy.get(
          '[slot="footer"]'
        )
        .first()
        .should(
          'contain.text',
          'Joined 2024'
        )

      }
    )

    it(
      'supports profile card',
      () => {

        cy.contains(
          'Neha Sharma'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Frontend Developer'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports designer profile card',
      () => {

        cy.contains(
          'Alex Johnson'
        )
        .should(
          'exist'
        )

        cy.contains(
          'UI Designer'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports product card',
      () => {

        cy.contains(
          'Wireless Headphones'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Audio Device'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports buy action',
      () => {

        cy.contains(
          'button',
          'Buy Now'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports message action',
      () => {

        cy.contains(
          'button',
          'Message'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports image alt text',
      () => {

        cy.get(
          'img[alt]'
        )
        .should(
          'have.length.at.least',
          3
        )

      }
    )

    it(
      'uses native article element',
      () => {

        cy.get(
          'article'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'ARTICLE'
        )

      }
    )

    it(
      'supports all slots',
      () => {

        const slots = [
          'avatar',
          'title',
          'meta',
          'body',
          'action',
          'footer'
        ]

        slots.forEach(
          (
            slot
          ) => {

            cy.get(
              `[slot="${slot}"]`
            )
            .should(
              'exist'
            )

          }
        )

      }
    )

    it(
      'supports click interaction',
      () => {

        cy.contains(
          'button',
          'Follow'
        )
        .click()

        cy.contains(
          'button',
          'Follow'
        )
        .should(
          'exist'
        )

      }
    )

  }
)