// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import HomePage from '../pages/Homepage.js';
import LoginPage from '../pages/LoginPage.js';
import SignupPage from '../pages/SignupPage.js';

Cypress.Commands.add('registerUser', (user) => {
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

    HomePage.logoutUser();
});

Cypress.Commands.add('deleteUser', () => {
    HomePage.deleteAccount();
    HomePage.verifyAccountDeletedIsVisible();
    HomePage.clickContinueButton();
});