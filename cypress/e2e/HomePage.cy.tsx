describe('Open app redirect to home page', () => {
    it('passes', () => {
      cy.visit('/');
      cy.url().should('include', '/home')
    });
  });
  