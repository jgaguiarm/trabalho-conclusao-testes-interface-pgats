import LoginPage from '../../pages/LoginPage.js';
import HomePage from '../../pages/Homepage.js';
import SignupPage from '../../pages/SignupPage.js';
import ProductsPage from '../../pages/ProductsPage.js';
import CartPage from '../../pages/CartPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import PaymentPage from '../../pages/PaymentPage.js';

import { faker } from '@faker-js/faker';



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

    describe('User Registration with Existing Email', () => {
        it('TC5 - Register User with Existing Email', function() {
            const user = {
                ...this.user,
                email: `tc5.${Date.now()}@example.com`,
            };

            cy.registerUser(user);

            HomePage.visitHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateNewUserSignupIsVisible();
            LoginPage.fillSignupEmailAndPassword(user.name, user.email);
            LoginPage.clickSignupButton();
            LoginPage.verifyExistingEmailErrorMessageIsVisible();
        })
    })

    describe('Products)', () => {
        it('TC8 - Verify All Products and product detail page', function() {
            HomePage.visitHomePage();
            HomePage.validateHomePage

            ProductsPage.clickProductsButton();
            ProductsPage.validateProductPage();
            ProductsPage.validateAllProductsAreVisible();
            ProductsPage.getFirstProductData().then((product) => {

                expect(product.name).to.not.be.empty;
                expect(product.url).to.match(/^\/product_details\/\d+$/);

                ProductsPage.clickViewProductButton();

                ProductsPage.validateUserIsRedirectedToProductDetailPage(
                    product.url
                );

                ProductsPage.validateProductDetailsAreVisible(
                    product.name
                );
            });
            
        })

        it('TC9 - Search Product', () => {
            const searchTerm = 'Dress';

            HomePage.visitHomePage();
            HomePage.validateHomePage();

            ProductsPage.clickProductsButton();
            ProductsPage.validateProductPage();
            ProductsPage.validateAllProductsAreVisible();

            ProductsPage.searchProduct(searchTerm);
            ProductsPage.validateSearchedProductsAreVisible(searchTerm);
        });
    })

    describe('Subscription', () => {
        it('TC10 - Verify Subscription in home page', () => {

            const email = `tc10${Date.now()}@example.com`;

            HomePage.visitHomePage();
            HomePage.validateHomePage();

            HomePage.scrollToFooter();
            HomePage.fillSubscriptionEmail(email);
            HomePage.clickSubscribeButton();
            HomePage.validateSubscriptionSuccessMessageIsVisible();

        });
    })

    describe('Place Order', () => {
        it('TC15 - Place Order: Register before Checkout', function() {
            const user = {
                ...this.user,
                email: `tc15.${faker.string.uuid()}@example.com`
            };

            HomePage.visitHomePage();
            HomePage.validateHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateNewUserSignupIsVisible();
            LoginPage.fillSignupEmailAndPassword(user.name, user.email);
            LoginPage.clickSignupButton();

            SignupPage.validateAccountInformationIsVisible();
            SignupPage.fillSignupForm(user);
            SignupPage.clickCreateAccountButton();
            SignupPage.verifyAccountCreatedIsVisible();
            SignupPage.clickContinueButton();

            HomePage.veryfyLoggedInAsUserIsVisible(user.name);

            ProductsPage.addProductToCartByName('Blue Top');
            ProductsPage.clickContinueShoppingButton();

            ProductsPage.addProductToCartByName('Men Tshirt');
            ProductsPage.openCartFromModal();

            CartPage.validateCartPage();
            CartPage.proceedToCheckout();

            CheckoutPage.validateAddressDetails();
            CheckoutPage.validateOrderReview();
            CheckoutPage.enterComment('Please handle the order with care.');
            CheckoutPage.placeOrder();

            PaymentPage.fillPaymentDetails({
                nameOnCard: `${user.firstName} ${user.lastName}`,
                cardNumber: faker.string.numeric(16),
                cvc: faker.string.numeric(3),
                expirationMonth: '12',
                expirationYear: '2028'
            });
            PaymentPage.submitPayment();
            PaymentPage.verifyOrderSuccess();

            HomePage.deleteAccount();
            HomePage.verifyAccountDeletedIsVisible();
            HomePage.clickContinueButton();
        });

        it('TC16 - Place Order: Register before Checkout', function() {
            const user = {
                ...this.user,
                email: `tc16.${faker.string.uuid()}@example.com`
            };

            HomePage.visitHomePage();
            HomePage.validateHomePage();
            HomePage.clickSignupLoginButton();

            LoginPage.validateNewUserSignupIsVisible();
            LoginPage.fillSignupEmailAndPassword(user.name, user.email);
            LoginPage.clickSignupButton();

            SignupPage.validateAccountInformationIsVisible();
            SignupPage.fillSignupForm(user);
            SignupPage.clickCreateAccountButton();
            SignupPage.verifyAccountCreatedIsVisible();
            SignupPage.clickContinueButton();

            HomePage.veryfyLoggedInAsUserIsVisible(user.name);

            ProductsPage.addProductToCartByName('Blue Top');
            ProductsPage.clickContinueShoppingButton();

            ProductsPage.addProductToCartByName('Men Tshirt');
            ProductsPage.openCartFromModal();

            CartPage.validateCartPage();
            CartPage.proceedToCheckout();

            CheckoutPage.validateAddressDetails();
            CheckoutPage.validateOrderReview();
            CheckoutPage.enterComment('Please handle the order with care.');
            CheckoutPage.placeOrder();

            PaymentPage.fillPaymentDetails({
                nameOnCard: `${user.firstName} ${user.lastName}`,
                cardNumber: faker.string.numeric(16),
                cvc: faker.string.numeric(3),
                expirationMonth: '12',
                expirationYear: '2028'
            });
            PaymentPage.submitPayment();
            PaymentPage.verifyOrderSuccess();

            HomePage.deleteAccount();
            HomePage.verifyAccountDeletedIsVisible();
            HomePage.clickContinueButton();
        }); 
    })
})
