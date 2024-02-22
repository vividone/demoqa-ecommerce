/// <reference types="cypress" />

describe('Order a product', () => {
	beforeEach('passes', () => {
		cy.visit('/');
		cy.get('.woocommerce-store-notice__dismiss-link').click();
	});
	it('adds a product to cart', () => {
		cy.get('.post-1497 > .noo-product-inner').click();
		cy.get('#pa_color').should('have.length.greaterThan', 0).select(1);
		cy.get('#pa_size').should('have.length.greaterThan', 0).select(1);
		cy.get('.single_add_to_cart_button').click();
		cy.get('.wc-block-components-notice-banner').should('be.visible');
		cy.get('.wc-block-components-notice-banner__content > .button')
			.should('have.attr', 'href', 'https://shop.demoqa.com/cart/')
			.click();
		cy.get('.cart_item').should('have.length.greaterThan', 0);
	});

	it('clears cart', () => {
		cy.get('.post-1497 > .noo-product-inner').click();
		cy.get('#pa_color').should('have.length.greaterThan', 0).select(1);
		cy.get('#pa_size').should('have.length.greaterThan', 0).select(1);
		cy.get('.single_add_to_cart_button').click();
		cy.get('.wc-block-components-notice-banner').should('be.visible');
		cy.get('.wc-block-components-notice-banner__content > .button')
			.should('have.attr', 'href', 'https://shop.demoqa.com/cart/')
			.click();
		cy.get('.empty-cart').click();
		cy.wait(3000);
		cy.get('.wc-block-components-notice-banner').should('be.visible');
		cy.get('.wc-block-components-notice-banner__content').should(
			'contain.text',
			'Your cart is currently empty'
		);
	});
});
