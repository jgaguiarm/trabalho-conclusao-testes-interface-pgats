class HomePage {
    visitHomePage() {
        cy.visit('/');
        this.validateHomePage();
    }

    validateHomePage() {
        cy.url().should('eq', 'https://automationexercise.com/');

        cy.contains('h2','Full-Fledged practice website for Automation Engineers').should('be.visible');
    }

    clickSignupLoginButton() {
        cy.get('a[href="/login"]').click();
    }

    veryfyLoggedInAsUserIsVisible(name) {
        cy.contains(`Logged in as ${name}`).should('be.visible');
    }

    deleteAccount() {
        cy.get('a[href="/delete_account"]').click();
    }

    clickDeleteAccountButton() {
        cy.get('[data-qa="delete-account"]').click();
    }

    verifyAccountDeletedIsVisible() {
        cy.get('.title').contains('Account Deleted!').should('be.visible');
    }

    clickContinueButton() {
        cy.get('[data-qa="continue-button"]').click();
    }
}

export default new HomePage();