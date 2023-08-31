describe('Should be able to login', () => {
  it('login the account', () => {
    const email = "admin@email.com"
    const password = "123"
    cy.visit('http://localhost:5000/login')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#email').clear('ad');
    cy.get('#email').type('admin@dev.com');
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.v-form > .v-btn > .v-btn__content').click();
    cy.get('.v-btn__content > .v-avatar > .v-responsive > .v-img__img').click();
    cy.get('.ml-3 > .text-caption').should('have.text', 'admin@dev.com');
    /* ==== End Cypress Studio ==== */
  })
})
