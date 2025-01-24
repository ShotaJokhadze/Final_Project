describe('Authentication', () => {
  const validEmail = 'test@gmail.com';
  const validPassword = 'Testuser123';

  beforeEach(() => {
    cy.visit('/en');
  });

  it('Logs in and out successfully', () => {

    // login
    cy.get('[data-cy="login-in"]').click();
    cy.get('[data-cy="login-email-input"]').type(validEmail);
    cy.get('[data-cy="login-password-input"]').type(validPassword);
    cy.get('[data-cy="login-submit-button"]').click(); 
    cy.url().should('not.include', '/login');

    // logout
    cy.get('[data-cy="log-out"]').click();
    cy.url().should('include', '/login');
  });

  it('Fails to log in with incorrect credentials', () => {
    cy.get('[data-cy="login-in"]').click();
    cy.get('[data-cy="login-email-input"]').type('wrong@gmail.com');
    cy.get('[data-cy="login-password-input"]').type('WrongPassword123');
    cy.get('[data-cy="login-submit-button"]').click();
    
    cy.get('[data-cy="login-error-message"]')
      .should('be.visible')
      .and('not.be.empty');
  });
})