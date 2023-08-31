describe('Broker offers', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('aggregate offers', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4000/');
    cy.get('b').should('be.visible');
    cy.get('[href="http://localhost:8080/p/cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OnJiQXVDU2Y4cjkydWFCSFBR/main-node---39-test-product-copy-5"] > .hover\\:bg-slate-50').should('be.visible');
    cy.get('[data-cy="search"]').clear('c');
    cy.get('[data-cy="search"]').type('chicken');
    cy.get('[href="http://localhost:8080/p/cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OktCSjl3Q2Y4UDRRbjRiZ1FU/main-node---32-test-product-copy-5"] > .hover\\:bg-slate-50 > :nth-child(1) > .flex > :nth-child(2) > .text-2xl').should('have.text', 'Refined Steel Chicken');
    cy.get('[href="http://localhost:8080/p/cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OktCSjl3Q2Y4UDRRbjRiZ1FU/main-node---32-test-product-copy-5"] > .hover\\:bg-slate-50').click();
    /* ==== End Cypress Studio ==== */
  });
})
