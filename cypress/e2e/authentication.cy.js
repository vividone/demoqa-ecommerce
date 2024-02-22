/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Authentication tests', () => {
	beforeEach('passes', () => {
		cy.visit('/');
		cy.get('.woocommerce-store-notice__dismiss-link').click();
		cy.get('.pull-right > :nth-child(2) > a')
			.should('have.attr', 'href', 'https://shop.demoqa.com/my-account/')
			.and('have.text', 'My Account')
			.click();
		cy.url().should('eq', 'https://shop.demoqa.com/my-account/');
	});

	// Verify Account Login
	// with valid credentials
	// with invalid credentials
	it('Verify user cannot login with invalid credentials', () => {
		let username = faker.internet.userName();
		let password = faker.internet.password();

		cy.get(
			'.u-column1 > .woocommerce-form > :nth-child(1) input[name="username"]'
		).type(username);
		cy.get('#password').type(password);
		cy.get(':nth-child(3) > .woocommerce-button')
			.should('have.text', 'Log in')
			.click();
		cy.get('.wc-block-components-notice-banner__content').should(
			'contain.text',
			'ERROR'
		);
	});
	// Verify Account Creation
	it('Verify Account Creation', () => {
		let username = faker.internet.userName();
		let password = faker.internet.password();
		let email = faker.internet.email();

		cy.get('.pull-right > :nth-child(2) > a').click();
		cy.get(
			'.u-column2 > .woocommerce-form > :nth-child(1) input[name="username"]'
		).type(username);
		cy.get(
			'.u-column2 > .woocommerce-form > :nth-child(2) input[name="email"]'
		).type(email);
		cy.get(
			'.u-column2 > .woocommerce-form > :nth-child(3) input[name="password"]'
		).type(password);
		cy.get('.woocommerce-Button').click();
	});
	// Verify Account Logout
	// it('', () => {});
});
