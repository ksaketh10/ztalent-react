import { CURRENT_USER } from "../../src/_constants/UriConstants";
import { Messages } from "../../src/_constants/Messages";

describe('Add Project', () => {

    beforeEach(() => {
        localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
        cy.seedAndVisit()
    })

    it('Type new project and click add project should be added', () => {
        cy.route('GET', '/project', 'fixture:projectsAfterNewproject.json')
        cy.route({
            url: '/project',
            method: 'POST',
            status: 200,
            response: {}
        })
        setUp()
        cy.get('#client-snackbar')
            .should("have.text", Messages.ADD_PROJECT_SUCCESS)
    })

    it('Type new project and click and has network error shows error snackbar', () => {
        cy.route('GET', '/project', 'fixture:projectsAfterNewproject.json')
        cy.route({
            url: '/project',
            method: 'POST',
            status: 400,
            response: ''
        })

        setUp();

        cy.get('#client-snackbar')
            .should("have.text", 'Sorry, something went wrong')
    })

    it('Type new project and click and has network error shows error snackbar', () => {
        const error = 'Record already exists'
        cy.route({
            url: '/project',
            method: 'POST',
            status: 500,
            response: {
                message: error
            }
        })

        setUp();

        cy.get('#client-snackbar')
            .should("have.text", error)
    })
})

function setUp() {
    cy.get('#add_employee')
        .click();
    cy.get('#react-select-3-input')
        .type('NewProject', { force: true });
    cy.get('.MultiSelector-root-462 #no_options')
        .click();
}

