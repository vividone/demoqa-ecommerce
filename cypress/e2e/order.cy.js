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
		cy.wait(2000);
		cy.get('.cart-count').should('not.have.value', 0);
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

	it('updates cart items and checkout', () => {
		cy.get('.post-1497 > .noo-product-inner').click();
		cy.get('#pa_color').should('have.length.greaterThan', 0).select(1);
		cy.get('#pa_size').should('have.length.greaterThan', 0).select(1);
		cy.get('.single_add_to_cart_button').click();
		cy.wait(2000);
		cy.get('.cart-count').should('not.have.value', 0);
		cy.get('.wc-block-components-notice-banner').should('be.visible');
		cy.get('.wc-block-components-notice-banner__content > .button')
			.should('have.attr', 'href', 'https://shop.demoqa.com/cart/')
			.click();
		cy.get('.cart_item').should('have.length.greaterThan', 0);
		cy.get('.cart_item > .product-quantity button[class=qty-increase]')
			.click()
			.wait(2000)
			.then(() => {
				cy.get(
					'.cart_item > .product-quantity input[class*=input-text]'
				).should('have.value', 2);
			})
			.wait(2000);
		cy.get('.actions input[name=update_cart]').click();
		cy.get('.wc-block-components-notice-banner').should('be.visible');
		cy.get('.wc-block-components-notice-banner__content').should(
			'contain.text',
			'Cart updated.'
		);
		cy.get('.continue')
			.click()
			.wait(2000)
			.then(() => {
				cy.url().should('include', '/shop');
				cy.get('.products').should('have.length.greaterThan', 0);
				cy.get('.products > .noo-product-item').first().click();
				cy.wait(2000);

				cy.get('#pa_color').should('have.length.greaterThan', 0).select(2);
				cy.get('#pa_size').should('have.length.greaterThan', 0).select(2);
				cy.get('.single_add_to_cart_button').click();

				cy.get('.cart-button')
					.should('have.attr', 'href', 'https://shop.demoqa.com/cart/')
					.click();
			});
		cy.get('tbody').should('have.length.greaterThan', 1);
		// checkouts
		cy.get('.wc-proceed-to-checkout > .checkout-button')
			.should('have.attr', 'href', 'https://shop.demoqa.com/checkout/')
			.click();
		cy.url().location();
	});
});
