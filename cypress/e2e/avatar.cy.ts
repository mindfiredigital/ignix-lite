describe(
  'Avatar Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/avatar'
      )

    })

    it(
      'renders image avatars',
      () => {

        cy.get(
          'img[data-size]'
        )
        .should(
          'have.length.at.least',
          3
        )

      }
    )

    it(
      'renders fallback avatar',
      () => {

        cy.get(
          'span[data-size="md"]'
        )
        .should(
          'contain.text',
          'JD'
        )

      }
    )

    it(
      'supports small avatar',
      () => {

        cy.get(
          'img[data-size="sm"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports medium avatar',
      () => {

        cy.get(
          'img[data-size="md"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports large avatar',
      () => {

        cy.get(
          'img[data-size="lg"]'
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
        .first()
        .should(
          'have.attr',
          'alt'
        )

      }
    )

    it(
      'shows avatar skeleton',
      () => {

        cy.get(
          '[data-avatar-skeleton]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports avatar wrapper',
      () => {

        cy.get(
          '[data-avatar-wrapper]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports usage example avatar',
      () => {

        cy.contains(
          'Sarah Johnson'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports user role text',
      () => {

        cy.contains(
          'Product Designer'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'uses native image element',
      () => {

        cy.get(
          'img'
        )
        .first()
        .invoke(
          'prop',
          'tagName'
        )
        .should(
          'eq',
          'IMG'
        )

      }
    )

    it(
      'uses native span fallback',
      () => {

        cy.get(
          'span[data-size="md"]'
        )
        .should(
          'contain.text',
          'JD'
        )
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
      'supports all avatar sizes',
      () => {

        const sizes = [
          'sm',
          'md',
          'lg'
        ]

        sizes.forEach(
          (
            size
          ) => {

            cy.get(
              `[data-size="${size}"]`
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