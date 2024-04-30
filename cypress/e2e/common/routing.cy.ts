describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('[data-testid=MainPage]').should('exist');
  });
});
