describe('SF order offer', () => {
  it('should be able order offer ', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="login-icon"]').click();
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('[data-testid="password"] > .sf-input__wrapper > .sf-input__label').click();
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.sf-loader > div').click();
    cy.get('[data-e2e="app-header-url_offers"] > .sf-header-navigation-item__item--desktop > .sf-link').click();
    cy.get('.sf-input__label').click();
    cy.get('#name').clear('c');
    cy.get('#name').type('chicken');
    cy.get(':nth-child(1) > .sf-link > .offer-card-header > .justify-between > .flex > h4.font-normal > :nth-child(1)').click();
    cy.get('[data-testid="increase"]').click();
    cy.get('[data-testid="increase"]').click();
    cy.get('.sf-add-to-cart__button').click();
    cy.get('.sf-header__icon > .sf-icon-path').click();
    cy.get('a > .sf-button--full-width').click();
    cy.get('.sf-address__icon > .sf-icon-path').click();
    cy.get('.sf-address-picker > .sf-radio > .sf-radio__container > input').check();
    cy.get('.form__action-button').click();
    cy.get('[data-testid="payment-methods"] > .sf-radio > .sf-radio__container > .sf-radio__checkmark').click();
    cy.get('[data-testid="payment-methods"] > .sf-radio > .sf-radio__container > input').check();
    cy.get(':nth-child(3) > .sf-radio > .sf-radio__container > .sf-radio__checkmark').click();
    cy.get(':nth-child(3) > .sf-radio > .sf-radio__container > input').check();
    cy.get('.summary__action-button').click();
    cy.get(':nth-child(1) > .sf-property__value').should('have.text', '\n      3\n    ');
    cy.get(':nth-child(3) > .sf-property__value').should('have.text', '\n      0,00 €\n    ');
    cy.get(':nth-child(4) > .sf-property__value').should('have.text', '\n      0,00 €\n    ');
    cy.get(':nth-child(6) > .sf-property__value').should('be.visible');
    cy.get('.fill-width').should('be.enabled');
    cy.get('.fill-width').click();
  })
  it('view order', function() {
    cy.visit('http://localhost:8080');
    cy.get('[data-cy="login-icon"] > .sf-icon > .sf-icon-path').click();
    cy.get('[data-testid="email"] > .sf-input__wrapper > .sf-input__label').click();
    cy.get('#email').clear('ad');
    cy.get('#email').type('admin@dev.com');
    cy.get('[data-testid="password"] > .sf-input__wrapper > .sf-input__label').click();
    cy.get('#password').clear('1');
    cy.get('#password').type('123');
    cy.get('.sf-loader > div').click();
    cy.get('[data-cy="login-icon"]').click();
    cy.get('[data-testid="Order history"] > .sf-menu-item__label').click();
    cy.get(':nth-child(2) > .sf-table__row > .orders__view > .sf-button--text').click({ multiple: true });
    cy.get('.text-right > a').should('be.visible');
    cy.get('.text-right > a').click();
    cy.get('.pl-4').should('have.text', '\n            The order is currently being processed by the provider. As soon as your order is completed, the digital\n            fulfillment will appear on this page.\n          ');
    cy.get('.highlighted > :nth-child(1) > .sf-property__value').should('be.visible');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('write review', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');
    cy.get('[data-cy="login-icon"]').click();
    cy.get('[data-testid="email"] > .sf-input__wrapper > .sf-input__label').click();
    cy.get('#email').click();
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('[data-testid="password"] > .sf-input__wrapper > .sf-input__label').click();
    cy.get('#password').clear('1');
    cy.get('#password').type('123');
    cy.get('.sf-loader > div').click();
    cy.get('[data-e2e="app-header-url_offers"] > .sf-header-navigation-item__item--desktop > .sf-link').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .sf-link > .offer-card-header > .my-2').click();
    cy.get('.sf-add-to-cart__button').click();
    cy.get('[aria-label="Toggle cart sidebar"] > .sf-badge--number').click();
    cy.get('a > .sf-button--full-width').click();
    cy.get('.form__action-button').click();
    cy.get('[data-testid="payment-methods"] > .sf-radio > .sf-radio__container > .sf-radio__checkmark').click();
    cy.get('[data-testid="payment-methods"] > .sf-radio > .sf-radio__container > input').check();
    cy.get(':nth-child(3) > .sf-radio > .sf-radio__container > .sf-radio__checkmark').click();
    cy.get(':nth-child(3) > .sf-radio > .sf-radio__container > input').check();
    cy.get('.summary__action-button').click();
    cy.get('.fill-width').click();
    cy.get('[data-e2e="app-header-url_offers"] > .sf-header-navigation-item__item--desktop > .sf-link').click();
    cy.get(':nth-child(2) > .sf-link > .offer-card-header > .my-2').click();
    cy.get(':nth-child(4) > .sf-button--pure').click();
    cy.get('[data-cy="add-review"]').click();
    cy.get(':nth-child(4) > .vue-star-rating-star > :nth-child(4)').click();
    cy.get('textarea').click();
    cy.get('textarea').type('Review test');
    cy.get('.sf-modal__content > .color-primary').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.px-5 > p').should('have.text', '\n      Thank you for your opinion\n    ');
    cy.get('[data-e2e="app-header-url_offers"] > .sf-header-navigation-item__item--desktop > .sf-link').click();
    cy.get(':nth-child(2) > .sf-link > .offer-card-header > .my-2').click();
    cy.get(':nth-child(4) > .sf-button--pure').click();
    cy.get('[data-cy="customer-reviews"]').should('have.text', 'Customer reviews');
    cy.get('.sf-review__author').should('have.text', '\n      Awesome Admin\n    ');
    cy.get('.sf-review__message').should('have.text', 'Review test');
    /* ==== End Cypress Studio ==== */
  });
})
