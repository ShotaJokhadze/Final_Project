describe('products', () => {
  const validEmail = 'test@gmail.com';
  const validPassword = 'Testuser123';

  beforeEach(() => {
    cy.visit('/en');
  });

  it('adds product successfully', () => {
    cy.get('[data-cy="login-in"]').click();
    cy.get('[data-cy="login-email-input"]').type(validEmail);
    cy.get('[data-cy="login-password-input"]').type(validPassword);
    cy.get('[data-cy="login-submit-button"]').click(); 
    
    cy.wait(2500);
    cy.visit('/en/products');
    
    cy.get('[data-cy="create-product-link"]').click(); 
    cy.get('[data-cy="create-product-title"]').type('TestProduct');
    cy.get('[data-cy="create-product-description"]').type('TestProductDescription');
    cy.get('[data-cy="create-product-price"]').type('123');
    cy.get('[data-cy="create-product-brand"]').type('TestBrand');
    cy.get('[data-cy="create-product-image"]').type('https://cdn.dummyjson.com/products/images/smartphones/Vivo%20X21/1.png');
    cy.get('[data-cy="create-product-button"]').click();
    
    cy.wait(1000);

    cy.get('[data-cy="create-product-success-message"]')
      .should('be.visible')
      .and('not.be.empty');
  })
})