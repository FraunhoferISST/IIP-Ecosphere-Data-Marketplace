describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('login and logout', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4000');
    cy.get('.el-button > span').click();
    cy.get('[data-cy="email"]').clear('ad');
    cy.get('[data-cy="email"]').type('admin@dev.com');
    cy.get('[data-cy="password"]').clear('1');
    cy.get('[data-cy="password"]').type('123');
    cy.get('[data-cy="node"]').click();
    cy.contains('http://localhost:8080').click({ force: true});
    cy.get('.el-dialog__footer > .el-button > span').click();
    cy.get('.ml-4 > .el-button > span').should('be.visible');
    cy.get('.pt-2 > .block').should('have.text', 'Awesome Admin');
    cy.get('.pt-2 > .text-slate-500').should('have.text', 'admin@dev.com');
    cy.get('.ml-4 > .el-button > span').click();
    cy.get('.el-menu > .el-button > span').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})
