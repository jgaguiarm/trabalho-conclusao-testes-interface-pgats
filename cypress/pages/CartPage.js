class CartPage {
    validateCartPage() {
        cy.url().should('include', '/view_cart');
        cy.get('#cart_info_table').should('be.visible');
        cy.get('#cart_info_table tbody tr').should('have.length.greaterThan', 0);
    }

    proceedToCheckout() {
        cy.get('a.check_out').click();
    }
}

export default new CartPage();