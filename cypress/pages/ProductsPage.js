
class ProductsPage {

    clickProductsButton() {
        cy.get('a[href="/products"]').click();
    }

    validateProductPage() {
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');
    }

    validateAllProductsAreVisible() {
        cy.get('.features_items').should('be.visible');

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0);
    }

    getFirstProductData() {
        return cy.get('.features_items .product-image-wrapper')
            .first()
            .then(($product) => {
                const name = $product.find('.productinfo p').text().trim();

                const url = $product
                    .find('a[href^="/product_details/"]')
                    .first()
                    .attr('href');

                return { name, url };
            });
    }

    clickViewProductButton() {
        cy.get('.features_items .product-image-wrapper')
            .first()
            .find('a[href^="/product_details/"]')
            .first()
            .click({ force: true });
    }

    validateUserIsRedirectedToProductDetailPage(productUrl) {
        cy.url().should('include', productUrl);
        cy.get('.product-information').should('be.visible');
    }

    validateProductDetailsAreVisible(productName) {
        cy.get('.product-information').within(() => {

            cy.get('h2')
                .should('be.visible')
                .and('contain.text', productName);

            cy.contains('p', /^Category:/)
                .should('be.visible')
                .invoke('text')
                .should('match', /Category:\s*\S+/);

            cy.get('span')
                .contains(/^Rs\./)
                .should('be.visible');

            cy.contains('p', /^Availability:/)
                .should('be.visible')
                .invoke('text')
                .should('match', /Availability:\s*\S+/);

            cy.contains('p', /^Condition:/)
                .should('be.visible')
                .invoke('text')
                .should('match', /Condition:\s*\S+/);

            cy.contains('p', /^Brand:/)
                .should('be.visible')
                .invoke('text')
                .should('match', /Brand:\s*\S+/);
        });
    }
}

export default new ProductsPage();
