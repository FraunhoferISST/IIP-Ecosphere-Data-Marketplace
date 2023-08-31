describe('Shop reviews', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('write shop review', function() {
    cy.visit('http://localhost:8080');
    cy.get('[data-cy="login-icon"]').click();
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.sf-loader > div').click();

    cy.wait(500)

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="vendor"]').click();
    cy.reload()
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.sf-tabs > :nth-child(2) > .sf-button--pure').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="add-review"]').click();
    cy.get(':nth-child(3) > .vue-star-rating-star').click();
    cy.get('textarea').click();
    cy.get('textarea').type("Review shop from test");
    cy.get('.sf-modal__content > .color-primary').click();
    cy.get('.px-5 > p').should('have.text', '\n      Thank you for your opinion\n    ');
    /* ==== End Cypress Studio ==== */
    cy.reload()
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.sf-tabs > :nth-child(2) > .sf-button--pure').click();
    cy.get('[data-cy="customer-reviews"]').should('have.text', 'Customer reviews');
    cy.get('.sf-review__author').should('have.text', '\n      Awesome Admin\n    ');
    cy.get('.sf-review__message').should('have.text', 'Review shop from test');
    /* ==== End Cypress Studio ==== */
  });
})
