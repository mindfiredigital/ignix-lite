describe(
  'Tabs Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/tab'
      )

    })

    it(
      'renders tabs component',
      () => {

        cy.get(
          'ix-tabs'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'renders default tabs',
      () => {

        cy.contains(
          'Overview'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Analytics'
        )
        .should(
          'exist'
        )

        cy.contains(
          'Settings'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'selects tab on click',
      () => {

        cy.contains(
          'Analytics'
        )
        .click()

        cy.contains(
          'Analytics'
        )
        .should(
          'have.attr',
          'aria-selected',
          'true'
        )

      }
    )

    it(
      'keeps first tab selected initially',
      () => {

        cy.contains(
          'Overview'
        )
        .should(
          'have.attr',
          'aria-selected',
          'true'
        )

      }
    )

    it(
      'supports underline variant',
      () => {

        cy.get(
          'ix-tabs[data-variant="underline"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports pill variant',
      () => {

        cy.get(
          'ix-tabs[data-variant="pill"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports gradient variant',
      () => {

        cy.get(
          'ix-tabs[data-variant="gradient"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports keyboard navigation right arrow',
      () => {

        cy.contains(
          'Overview'
        )
        .as(
          'overviewTab'
        )

        cy.get(
          '@overviewTab'
        )
        .focus()

        cy.get(
          '@overviewTab'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowRight'
          }
        )

        cy.contains(
          'Analytics'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports keyboard navigation left arrow',
      () => {

        cy.contains(
          'Analytics'
        )
        .as(
          'analyticsTab'
        )

        cy.get(
          '@analyticsTab'
        )
        .focus()

        cy.get(
          '@analyticsTab'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowLeft'
          }
        )

        cy.contains(
          'Overview'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports enter selection',
      () => {

        cy.contains(
          'Settings'
        )
        .as(
          'settingsTab'
        )

        cy.get(
          '@settingsTab'
        )
        .focus()

        cy.get(
          '@settingsTab'
        )
        .trigger(
          'keydown',
          {
            key: 'Enter'
          }
        )

        cy.contains(
          'Settings'
        )
        .should(
          'have.attr',
          'aria-selected',
          'true'
        )

      }
    )

    it(
      'supports space selection',
      () => {

        cy.contains(
          'Reports'
        )
        .as(
          'reportsTab'
        )

        cy.get(
          '@reportsTab'
        )
        .focus()

        cy.get(
          '@reportsTab'
        )
        .trigger(
          'keydown',
          {
            key: ' '
          }
        )

        cy.contains(
          'Reports'
        )
        .should(
          'have.attr',
          'aria-selected',
          'true'
        )

      }
    )

    it(
      'applies tab role',
      () => {

        cy.contains(
          'Overview'
        )
        .should(
          'have.attr',
          'role',
          'tab'
        )

      }
    )

    it(
      'applies tablist role',
      () => {

        cy.get(
          'ix-tabs'
        )
        .first()
        .should(
          'have.attr',
          'role',
          'tablist'
        )

      }
    )

  }
)