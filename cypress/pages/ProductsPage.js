
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

    
    searchProduct(searchTerm) {
        cy.get('#search_product').clear().type(searchTerm);
        cy.get('#submit_search').click();

        cy.location('search')
            .should('include', 'search=');

        cy.contains('h2', 'Searched Products')
            .should('be.visible');
    }

    validateSearchedProductsAreVisible() {
        cy.get('.features_items')
            .should('be.visible');

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0);

        cy.get('.features_items .product-image-wrapper')
            .each(($product) => {
                cy.wrap($product).should('be.visible');

                cy.wrap($product)
                    .find('.productinfo p')
                    .should('be.visible')
                    .and('not.be.empty');
            });
    }
   
    
    addProductToCartByName(productName) {
        cy.contains('.features_items .product-image-wrapper .productinfo p', productName)
            .should('be.visible')
            .closest('.product-image-wrapper')
            .find('a.add-to-cart')
            .first()
            .click({ force: true });

        cy.get('#cartModal').should('be.visible');
    }

    
    validateProductAddedToCartModalIsVisible() {
        cy.get('#cartModal').should('be.visible');
        cy.get('#cartModal .modal-content').should('be.visible');
        cy.get('#cartModal .modal-content h4')
            .should('be.visible')
            .and('contain.text', 'Added!');
    }

   clickContinueShoppingButton() {
        cy.get('#cartModal')
        .contains('button', 'Continue Shopping')
        .should('be.visible')
        .click();
    }

    clickGoToCartButton() {
        cy.get('#cartModal')
        .contains('a', 'View Cart')
        .should('be.visible')
        .click();
    }

    verifyUserIsRedirectedToCartPage() {
        cy.url().should('include', '/view_cart');
        cy.contains('h2', 'Shopping Cart').should('be.visible');
    }

    openCartFromModal() {
        cy.get('#cartModal')
        .find('a[href="/view_cart"]')
        .should('be.visible')
        .click();
    }

}

export default new ProductsPage();
