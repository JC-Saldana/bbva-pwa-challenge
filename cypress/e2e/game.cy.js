describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('input[type="text"]').type('User');
    cy.get('input[type="text"]').should('have.value', 'User');
    cy.contains('Login').click()
    cy.contains('Start').click()
  })
})
