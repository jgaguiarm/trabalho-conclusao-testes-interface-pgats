import { faker } from '@faker-js/faker';

class SignupPage {
    visitSignupPage() {
        cy.visit('/signup');
    }

    fillSignupForm({title, password, firstName, lastName}) {
        cy.get(`input[name="title"][value="${title}"]`)
          .should('exist')
          .check({ force: true });

        cy.get('[data-qa="password"]').type(password);

        cy.get('[data-qa="days"]').select(
            faker.number.int({ min: 1, max: 28 }).toString()
        );

        cy.get('[data-qa="months"]').select(
            faker.date.month()
        );

        cy.get('[data-qa="years"]').select(
            faker.number.int({ min: 1950, max: 2005 }).toString()
        );

        cy.get('#newsletter').check();
        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type(firstName);
        cy.get('[data-qa="last_name"]').type(lastName);

        cy.get('[data-qa="company"]').type(faker.company.name());
        cy.get('[data-qa="address"]').type(faker.location.streetAddress());
        cy.get('[data-qa="address2"]').type(faker.location.secondaryAddress());
        cy.get('[data-qa="country"]').select('United States');
        cy.get('[data-qa="state"]').type(faker.location.state());
        cy.get('[data-qa="city"]').type(faker.location.city());
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode('#####'));
        cy.get('[data-qa="mobile_number"]').type(
            faker.string.numeric(10)
        );
    }

    clickCreateAccountButton() {
        cy.get('[data-qa="create-account"]').click();
    }

    verifyAccountCreatedIsVisible() {
        cy.get('.title').contains('Account Created!').should('be.visible');
    }

    clickContinueButton() {
        cy.get('[data-qa="continue-button"]').click();
    }

}

export default new SignupPage();
