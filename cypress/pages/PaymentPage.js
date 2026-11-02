
class PaymentPage {

    validatePaymentPage() {
        cy.url().should('include', '/payment');

        cy.get('input[name="name_on_card"]').should('be.visible');
        cy.get('input[name="card_number"]').should('be.visible');
        cy.get('input[name="cvc"]').should('be.visible');
        cy.get('input[name="expiry_month"]').should('be.visible');
        cy.get('input[name="expiry_year"]').should('be.visible');
    }

    fillPaymentDetails({
        nameOnCard,
        cardNumber,
        cvc,
        expirationMonth,
        expirationYear
    }) {
        cy.get('input[name="name_on_card"]').type(nameOnCard);
        cy.get('input[name="card_number"]').type(cardNumber);
        cy.get('input[name="cvc"]').type(cvc);
        cy.get('input[name="expiry_month"]').type(expirationMonth);
        cy.get('input[name="expiry_year"]').type(expirationYear);
    }

    submitPayment() {
        cy.get('[data-qa="pay-button"]').click();
    }

    validatePaymentSuccessMessageIsVisible() {
        cy.contains(
            'p',
            /Your order has been placed successfully!|Congratulations! Your order has been confirmed!/
        ).should('be.visible');
    }

    verifyOrderSuccess() {
        cy.contains('p', 'Congratulations! Your order has been confirmed!')
            .should('be.visible');
    }
}

export default new PaymentPage();
