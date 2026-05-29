describe(
  'Dropdown Component',
  () => {

    beforeEach(() => {

      cy.visit(
        'http://localhost:3000/ignix-lite/docs/components/dropdown'
      )

    })

    it(
      'renders dropdown',
      () => {

        cy.get(
          'ix-dropdown'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'opens dropdown on trigger click',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Invite Members'
        )
        .should(
          'be.visible'
        )

      }
    )

    it(
      'closes dropdown on second click',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Invite Members'
        )
        .should(
          'not.be.visible'
        )

      }
    )

    it(
      'opens using enter key',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .as(
          'workspaceBtn'
        )

        cy.get(
          '@workspaceBtn'
        )
        .focus()

        cy.get(
          '@workspaceBtn'
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
          'be.focused'
        )

      }
    )

    it(
      'opens using space key',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .as(
          'workspaceBtn'
        )

        cy.get(
          '@workspaceBtn'
        )
        .focus()

        cy.get(
          '@workspaceBtn'
        )
        .trigger(
          'keydown',
          {
            key: ' '
          }
        )

        cy.contains(
          'Settings'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'opens using arrow down',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .as(
          'workspaceBtn'
        )

        cy.get(
          '@workspaceBtn'
        )
        .focus()

        cy.get(
          '@workspaceBtn'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowDown'
          }
        )

        cy.contains(
          'Settings'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'opens using arrow up',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .as(
          'workspaceBtn'
        )

        cy.get(
          '@workspaceBtn'
        )
        .focus()

        cy.get(
          '@workspaceBtn'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowUp'
          }
        )

        cy.contains(
          'Logout'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports menu keyboard navigation down',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Settings'
        )
        .as(
          'settingsBtn'
        )

        cy.get(
          '@settingsBtn'
        )
        .focus()

        cy.get(
          '@settingsBtn'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowDown'
          }
        )

        cy.contains(
          'Invite Members'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'supports menu keyboard navigation up',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Billing'
        )
        .as(
          'billingBtn'
        )

        cy.get(
          '@billingBtn'
        )
        .focus()

        cy.get(
          '@billingBtn'
        )
        .trigger(
          'keydown',
          {
            key: 'ArrowUp'
          }
        )

        cy.contains(
          'Invite Members'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'closes using escape',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.contains(
          'Settings'
        )
        .as(
          'settingsBtn'
        )

        cy.get(
          '@settingsBtn'
        )
        .focus()

        cy.get(
          '@settingsBtn'
        )
        .trigger(
          'keydown',
          {
            key: 'Escape'
          }
        )

        cy.contains(
          'Workspace ▾'
        )
        .should(
          'be.focused'
        )

      }
    )

    it(
      'closes on outside click',
      () => {

        cy.contains(
          'Workspace ▾'
        )
        .click()

        cy.get(
          'body'
        )
        .click(
          0,
          0
        )

        cy.contains(
          'Invite Members'
        )
        .should(
          'not.be.visible'
        )

      }
    )

    it(
      'supports primary intent',
      () => {

        cy.get(
          'ix-dropdown[data-intent="primary"]'
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
          'ix-dropdown[data-intent="success"]'
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
          'ix-dropdown[data-intent="warning"]'
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
          'ix-dropdown[data-intent="danger"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports ghost intent',
      () => {

        cy.get(
          'ix-dropdown[data-intent="ghost"]'
        )
        .should(
          'exist'
        )

      }
    )

    it(
      'supports gradient intent',
      () => {

        cy.get(
          'ix-dropdown[data-intent="gradient"]'
        )
        .should(
          'exist'
        )

      }
    )

  }
)