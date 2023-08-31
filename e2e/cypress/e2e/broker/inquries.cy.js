describe('Broker inquiries', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('aggregate offers', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4000/inquiries');
    cy.get('b').should('be.visible');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="http://localhost:8080/inquiry/cmVhY3Rpb24vaW5xdWlyeTpTWk40bUJ1eDlOV3IzRm1rbg=="] > .hover\\:bg-slate-50').should('be.visible');
    cy.get('[data-cy="search"]').clear('ma');
    cy.get('[data-cy="search"]').type('main node');
    cy.get('[href="http://localhost:8080/inquiry/cmVhY3Rpb24vaW5xdWlyeTpEbnFwOEZCb0pjdVI3Qjd2aA=="] > .hover\\:bg-slate-50').should('be.visible');
    cy.get('[data-cy="search"]').click();
    cy.get('[href="http://localhost:8080/inquiry/cmVhY3Rpb24vaW5xdWlyeTpEbnFwOEZCb0pjdVI3Qjd2aA=="] > .hover\\:bg-slate-50 > :nth-child(1) > .flex > :nth-child(1) > .text-2xl').click();
    cy.get('[href="http://localhost:8080/inquiry/cmVhY3Rpb24vaW5xdWlyeTpEbnFwOEZCb0pjdVI3Qjd2aA=="] > .hover\\:bg-slate-50 > :nth-child(1) > .flex > :nth-child(1) > .text-2xl').click();
    /* ==== End Cypress Studio ==== */
  });
})
