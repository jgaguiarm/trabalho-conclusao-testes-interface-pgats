class LoginPage{
    visitLoginPage(){
        cy.visit('/login')
    }

    fillSignupEmailAndPassword(name, email){
        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(email)
    }

     clickLoginSubmitButton(){
        cy.get('[data-qa="login-button"]').click()
    }

    clickSignupButton(){
        cy.get('[data-qa="signup-button"]').click()
    }

    validateNewUserSignupIsVisible(){
        cy.get('.signup-form').contains('New User Signup!').should('be.visible');
    }
}

export default new LoginPage();