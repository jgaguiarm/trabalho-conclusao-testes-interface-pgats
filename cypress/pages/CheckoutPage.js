
class CheckoutPage {

    validateAddressDetails() {
        cy.get('#address_delivery').within(() => {
            cy.contains('h3', 'Your delivery address')
                .should('be.visible');

            cy.get('li:not(.address_title)')
                .should('have.length.greaterThan', 0)
                .each(($item) => {
                    expect($item.text().trim()).to.not.be.empty;
                });
        });

        cy.get('#address_invoice').within(() => {
            cy.contains('h3', 'Your billing address')
                .should('be.visible');

            cy.get('li:not(.address_title)')
                .should('have.length.greaterThan', 0)
                .each(($item) => {
                    expect($item.text().trim()).to.not.be.empty;
                });
        });
    }

    validateOrderReview() {
        cy.get('.cart_info').should('be.visible');

        cy.get('.cart_info')
        .should('contain.text', 'Blue Top')
        .and('contain.text', 'Men Tshirt');
    }

    enterComment(comment) {
        cy.get('textarea[name="message"]')
            .clear()
            .type(comment);
    }

    placeOrder() {
        cy.get('a[href="/payment"]').click();
    }
}

export default new CheckoutPage();
