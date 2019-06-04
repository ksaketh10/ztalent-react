Cypress.Commands.add('seedAndVisit', () => {
    cy.server()
    cy.route('GET', '/employee', 'fixture:employee')
    cy.route('GET', '/skill', 'fixture:skill')
    cy.route('GET', '/project', 'fixture:project')
    cy.visit('http://localhost:3000/home')
  })
  