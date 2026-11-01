import LoginPage from '../../pages/LoginPage.js';
import HomePage from '../../pages/Homepage.js';
import SignupPage from '../../pages/SignupPage.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('users.json').as('user');
    });

    describe('User Registration', () => {
        it('TC1 - Register User', function() {
            const user = this.user;

           HomePage.visitHomePage();
           HomePage.clickSignupLoginButton();

           LoginPage.validateNewUserSignupIsVisible();
           LoginPage.fillSignupEmailAndPassword(user.name, user.email);
           LoginPage.clickSignupButton();
           
           SignupPage.fillSignupForm({
                title: user.title,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
           });
           SignupPage.clickCreateAccountButton();
           SignupPage.verifyAccountCreatedIsVisible();
           SignupPage.clickContinueButton();

           HomePage.veryfyLoggedInAsUserIsVisible(user.name);
           HomePage.deleteAccount();
           HomePage.verifyAccountDeletedIsVisible();
           HomePage.clickContinueButton();

        })
    })

})