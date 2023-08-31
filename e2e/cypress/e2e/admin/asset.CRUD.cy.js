describe('Admin Assets CRUD', () => {
  it('assets CRUD', () => {
    cy.visit('http://localhost:5000/assets')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.v-form > .v-btn > .v-btn__content').click();
    cy.get('[href="/assets"] > .d-block').click();
    cy.get('.text-h2').should('have.text', 'Manage your assets');
    cy.get('.py-0 > :nth-child(2) > .d-flex > .v-btn > .v-btn__content').click();
    cy.get('#input-90').clear('Creating new Asset via test');
    cy.get('#input-90').type('Creating new Asset via test');
    cy.get('#input-93').click();
    cy.get('#input-93').click();
    cy.get('#input-93').click();
    cy.get('.create-content').click();
    cy.get('.create-form-container > :nth-child(2) > .v-btn > .v-btn__content').click();
    cy.get('.section-heading').should('have.text', 'arrow_backCreating new Asset via test');
    cy.get('#title').should('have.value', 'Creating new Asset via test');
    cy.get('#title').clear('Creating new Asset via test ');
    cy.get('#title').type('Creating new Asset via test updated');
    cy.get('.details-save-changes-container > .v-btn--flat > .v-btn__content').should('be.visible');
    cy.get('.details-save-changes-container > .v-btn--flat > .v-btn__content').click();
    cy.get('[href="/assets"] > .d-block').click();
    cy.get(':nth-child(1) > a > .product-card-container > :nth-child(2) > .justify-space-between > div > .product-card-title').should('have.text', 'Creating new Asset via test updated');
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('asset variant CRUD', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:5000/assets');
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.v-form > .v-btn').click();
    cy.get('[href="/assets"] > .d-block').click();
    cy.get(':nth-child(1) > a > .product-card-container > :nth-child(2) > .justify-space-between > div > .product-card-title').click();
    cy.get(':nth-child(2) > .card').click();
    cy.get('.my-2 > .v-btn > .v-btn__content').should('be.visible');
    cy.get('.my-2 > .v-btn > .v-btn__content').click();
    cy.get('#label').clear('te');
    cy.get('#label').type('test');
    cy.get('#option').clear('o');
    cy.get('#option').type('option');
    cy.get('.py-8 > .v-btn').click();
    cy.get('#title').should('have.value', 'New product variant title');
    cy.get('.asset-info > :nth-child(1) > .card > .font-weight-bold').should('have.text', 'test option');
    cy.get('#title').clear('New product variant title ');
    cy.get('#title').type('New product variant title updated');
    cy.get('.details-save-changes-container > .v-btn--flat > .v-btn__content').click();
    cy.get('.Vue-Toastification__toast-body').should('have.text', 'Data updated!');
    /* ==== End Cypress Studio ==== */
  });
})
