
describe('Sign In', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login")
    })

    it('focuses input on email', () => {
        cy.focused()
            .should('have.id', 'email')
    })

    it('accepts email input', () => {
        const typedEmail = 'firstName.lastName@zemosolabs.com'

        cy.get('#email')
            .type(typedEmail)
            .should('have.value', typedEmail)
    })

    it('accepts password input', () => {
        cy.get('#password')
            .type('Test123')
            .should('have.value', 'Test123')
    })

    context('Form submission', () => {
        beforeEach(() => {
            cy.server()
        })

        it('Does not type required fields should not submit form', () => {
            cy.get('#email')
                .type('{enter}')

            cy.get('#password')
                .type('{enter}')

            cy.location("pathname")
                .should("eq", "/login")
        })

        it('Types correct username and password navigates to home', () => {
            const email = 'saketh.kokonda@zemosolabs.com'
            const password = 'zemoso123'

            cy.get('#email')
                .type(email)
                .type('{enter}')

            cy.get('#password')
                .type(password)
                .type('{enter}')

            cy.location("pathname")
                .should("eq", "/home");
        })

        it('Types Incorrect username or password shows error message', () => {
            const email = 'test@zemosolabs.com'
            const password = 'test'

            cy.route({
                url: '/user/check',
                method: 'POST',
                status: 500,
                response: {
                    message: 'Email or Password is wrong'
                }
            })

            cy.get('#email')
                .type(email)
                .type('{enter}')

            cy.get('#password')
                .type(password)
                .type('{enter}')

            cy.location("pathname")
                .should("eq", "/login");

            cy.get('#client-snackbar')
                .should("have.text", 'Email or Password is wrong')
        })

        it('Types username or password and has network error shows error message', () => {
            const email = 'test@zemosolabs.com'
            const password = 'test'
            const error = 'Sorry, something went wrong'

            cy.route({
                url: '/user/check',
                method: 'POST',
                status: 400,
                response: ''
            })

            cy.get('#email')
                .type(email)
                .type('{enter}')

            cy.get('#password')
                .type(password)
                .type('{enter}')

            cy.location("pathname")
                .should("eq", "/login");

            cy.get('#client-snackbar')
                .should("have.text", error)
        })
    })
})