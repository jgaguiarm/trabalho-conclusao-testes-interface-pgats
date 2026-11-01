class LoginPage{
    visitLoginPage(){
        cy.visit('/login');
    }

    fillSignupEmailAndPassword(name, email){
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email);
    }

    fillLoginEmailAndPassword(email, password){
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password);
    }

     clickLoginSubmitButton(){
        cy.get('[data-qa="login-button"]').click();
    }

    clickSignupButton(){
        cy.get('[data-qa="signup-button"]').click();
    }

    validateLoginIsVisible(){
        cy.get('.login-form').contains('Login to your account').should('be.visible');
    }

    validateNewUserSignupIsVisible(){
        cy.get('.signup-form').contains('New User Signup!').should('be.visible');
    }
}

export default new LoginPage();