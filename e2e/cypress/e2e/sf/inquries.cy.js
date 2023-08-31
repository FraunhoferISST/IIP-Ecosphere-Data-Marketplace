import { faker } from '@faker-js/faker';

describe('SF Inquiries', () => {
  it('inquiries CRUD', function() {
    const newInquiryTitle = `${faker.random.numeric(2)}-${faker.lorem.words(10)}`

    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');
    cy.get('[data-cy="login-icon"]').click();
    cy.get('#email').clear('admin@dev.com');
    cy.get('#email').type('admin@dev.com');
    cy.get('#password').clear('123');
    cy.get('#password').type('123');
    cy.get('.sf-loader > div').click();
    cy.get('[data-cy="login-icon"]').click();
    cy.get('[data-testid="My inquiries"]').click();
    cy.get('#create-inquiry').click();
    cy.get('.sf-content-pages__section').click();
    cy.get('#title').clear();
    cy.get('#title').type(newInquiryTitle);
    cy.get('#description').type('Test description');
    cy.get('#sourceTypes').type('some,source,types');
    cy.get('#categories').type('some,categories,here');
    cy.get('#expectedConsumptionVolume').type('100 GB');
    cy.get('#desiredPricing').type('1000$ yearly');
    cy.get('[type="submit"]').click();

    cy.reload()
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.contains(newInquiryTitle).should('have.text', newInquiryTitle);
    cy.contains(newInquiryTitle).click();
    cy.get(':nth-child(25) > .items-end > .btn').click();
    cy.get('#title').clear();
    const newInquiryTitleUpdated = newInquiryTitle+"Updated"
    cy.get('#title').type(newInquiryTitleUpdated);
    cy.get('.form__action-button').click();
    cy.get('.pl-4').should('have.text', '\n        Successfully updated!\n      ');
    cy.get(':nth-child(1) > .sf-button--text').click();
    cy.get('[data-cy="login-icon"]').click();
    cy.contains('My inquiries').click();
    cy.get(':nth-child(25) > :nth-child(1) > h4').should('have.text', newInquiryTitleUpdated);
    cy.get('[data-e2e="app-header-url_inquiries"] > .sf-header-navigation-item__item--desktop > .sf-link').click();
    cy.get('.sf-input__label').click();
    cy.get('#name').clear('ne');
    cy.get('#name').type(newInquiryTitleUpdated);
    cy.contains(newInquiryTitleUpdated).click();
    cy.get('textarea').click();
    cy.get('textarea').type("Test reply");
    cy.get('.flex > .sf-button').click();
    cy.get('.pl-4').should('have.text', '\n        Your suggestion was sent successfully!\n      ');

    cy.reload()

    cy.get('b').should('have.text', '1');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.sf-price__regular').should('have.text', '\n        1000$ yearly\n      ');
    cy.get(':nth-child(1) > .sf-property__value').should('have.text', '\n      some, source, types\n    ');
    cy.get(':nth-child(2) > .sf-property__value').should('have.text', '\n      some, categories, here\n    ');
    cy.get(':nth-child(3) > .sf-property__value').should('have.text', '\n      100 GB\n    ');
    cy.get('.mt-16.flex > :nth-child(1) > :nth-child(2)').should('have.text', 'Awesome Admin');
    /* ==== End Cypress Studio ==== */
  });
})
