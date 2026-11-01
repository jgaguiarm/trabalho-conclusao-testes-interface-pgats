import LoginPage from '../../pages/LoginPage.js';
import HomePage from '../../pages/Homepage.js';
import SignupPage from '../../pages/SignupPage.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.fixture('users.json').as('user');
    });

    describe('User Registration', () => {
        it('TC1 - Register User', function() {
            const user = {
                ...this.user,
                email: `tc1.${Date.now()}@example.com`,
            };

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

    describe('User Login', () => {

        it('TC2 -  Login User with correct email and password', function() {
            const user = {
                ...this.user,
                email: `tc1.${Date.now()}@example.com`,
            };

            cy.registerUser(user);

            HomePage.visitHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateLoginIsVisible();

            LoginPage.fillLoginEmailAndPassword(user.email, user.password);
            LoginPage.clickLoginSubmitButton();

            HomePage.veryfyLoggedInAsUserIsVisible(user.name);

            cy.deleteUser();
        })

        it('TC3 -  Login User with incorrect email and password', function() {
            const invalidEmail = 'test@example.com';
            const invalidPassword = 'invalidpassword';

            HomePage.visitHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateLoginIsVisible();

            LoginPage.fillLoginEmailAndPassword(invalidEmail, invalidPassword);
            LoginPage.clickLoginSubmitButton();

            LoginPage.verifyLoginErrorMessageIsVisible();

        })
    })

    describe('User Logout', () => {
        it('TC4 - Logout User', function() {
           const user = {
                ...this.user,
                email: `tc4.${Date.now()}@example.com`,
            };

            cy.registerUser(user);

            HomePage.visitHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateLoginIsVisible();

            LoginPage.fillLoginEmailAndPassword(user.email, user.password);
            LoginPage.clickLoginSubmitButton();

            HomePage.veryfyLoggedInAsUserIsVisible(user.name);

            HomePage.logoutUser();

            LoginPage.validateRedirectToLoginPage();

            cy.loginSuccess(user);
            cy.deleteUser();
        })
    })

})
