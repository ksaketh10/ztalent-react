import { CURRENT_USER } from "../../src/_constants/UriConstants";
import { Messages } from "../../src/_constants/Messages";

describe('Add Skill', () => {

    beforeEach(() => {
        localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
        cy.seedAndVisit()
    })

    it('Type new skill and click add skill should be added', () => {
        cy.route('GET', '/skill', 'fixture:skillsAfterNewSkill.json')
        cy.route({
            url: '/skill',
            method: 'POST',
            status: 200,
            response: {}
        })
        // cy.get('#add_employee')
        //     .click();
        // cy.get('#react-select-2-input').click({ force: true })
        // cy.get('.MultiSelector-root-456 .MuiPaper-root-118')
        //     .children()
        //     .should('have.length', 10)
        //     .as('skills')
        // cy.get('@skills')
        //     .should('have.length', 10)

        // cy.get('.MultiSelector-valueContainer-458')
        //     .get(0)
        //     .get('.MuiChip-root-393')
        //     .as('skills')
        // cy.get('@skills')
        //     .should('have.length', 11)
        setUp()

        cy.get('#client-snackbar')
            .should("have.text", Messages.ADD_SKILL_SUCCESS)
    })

    it('Type new skill and click and has network error shows error snackbar', () => {
        cy.route({
            url: '/skill',
            method: 'POST',
            status: 400,
            response: ''
        })

        setUp();

        cy.get('#client-snackbar')
            .should("have.text", 'Sorry, something went wrong')
    })

    it('Type new skill and click and has network error shows error snackbar', () => {
        const error = 'Record already exists'
        cy.route({
            url: '/skill',
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
    cy.get('#react-select-2-input')
        .type('NewSkill', { force: true });
    cy.get('.MultiSelector-root-456 #no_options')
        .click();
}

