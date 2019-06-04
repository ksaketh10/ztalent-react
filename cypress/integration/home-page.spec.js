import { CURRENT_USER } from "../../src/_constants/UriConstants";
import { Messages } from "../../src/_constants/Messages";

describe('Home Page', () => {

  it("User not signed in and access page should be redirected", () => {
    localStorage.removeItem(CURRENT_USER);

    cy.seedAndVisit()

    cy.location("pathname")
      .should("eq", "/login");
  })

  it('No records available sees no records text', () => {
    localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
    cy.server()
    cy.route({
      url: '/employee',
      method: 'GET',
      status: 500,
      response: {
        message: 'Oops! No data available'
      }
    })
    cy.visit('http://localhost:3000/home')

    cy.get('tbody')
      .should('contain', 'Sorry, no results were found')
    cy.get('#client-snackbar')
      .should("have.text", 'Oops! No data available')
  })

  it('Has network error shows error snackbar', () => {
    localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
    cy.server()
    cy.route({
      url: '/employee',
      method: 'GET',
      status: 400,
      response: ''
    })
    cy.visit('http://localhost:3000/home')

    cy.get('tbody')
      .should('contain', 'Sorry, no results were found')
    cy.get('#client-snackbar')
      .should("have.text", 'Sorry, something went wrong')
  })

  context('Header', () => {
    beforeEach(() => {
      localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
      cy.seedAndVisit()
    })

    it("Sees Tool title, initials and name", () => {
      cy.get('#title')
        .should('have.text', 'Z-Talent')
      cy.get('#user')
        .should('have.text', 'saketh')
      cy.get('#initials')
        .should('have.text', 'sk')
    })

    it("Sees Log out button and text", () => {
      cy.get('#logout')
        .should('have.text', 'Log Out')
    })

    it("Click on Log out button and navigates to login screen", () => {
      cy.get('#logout')
        .should('have.text', 'Log Out')
        .click()

      cy.location("pathname")
        .should("eq", "/login");
    })
  })

  context('Employee Data table', () => {
    beforeEach(() => {
      localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
      cy.seedAndVisit()
    })

    it('Sees Employee Datatable Header', () => {
      cy.get('table').should('contain', 'Employee Skills')
    })

    it('Sees Employee Datatable Column Names', () => {
      cy.get('thead')
        .should('contain', 'EMP ID')
        .should('contain', 'FIRST NAME')
        .should('contain', 'LAST NAME')
        .should('contain', 'DESIGNATION')
        .should('contain', 'SKILLS')
        .should('contain', 'PROJECTS')
        .should('contain', 'ASSIGN')
        .should('contain', 'EDIT')
        .should('contain', 'DELETE')
    })

    it('Sees Employee Information', () => {
      cy.get('tr').eq(1)
        .should('contain', '1234')
        .should('contain', 'Saketh')
        .should('contain', 'Kumar')
        .should('contain', 'SDEIII')
        .should('contain', 'Java')
        .should('contain', 'React')

      cy.get('tr').eq(2)
        .should('contain', '2345')
        .should('contain', 'Shashank')
        .should('contain', 'Sheela')
        .should('contain', 'Principle SDE')
        .should('contain', 'Java')
        .should('contain', 'Aws')
        .should('contain', 'React')
        .should('contain', 'AdmitAlly')
    })
  })

  context('Add Employee Dialog', () => {
    beforeEach(() => {
      localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
      cy.seedAndVisit()
    })

    it('Click on add employee dialog form should be visible', () => {
      cy.get('#add_employee')
        .click()

      cy.get('form')
        .should('be.visible')
    })

    it.only('Click on add employee dialog form should see Add Employee title', () => {
      cy.get('#add_employee')
        .click()

      cy.get('.EmployeeInfoDialog-main-381')
        .find('h1')
        .should('have.text', 'Add Employee')
    })

    it('Add new employee dialog takes all input fields', () => {
      typeAndValidateNewEmployeeForm();
    })

    it('Form submit after filling employee info and should see new record', () => {
      cy.route('GET', '/employee', 'fixture:employeesAfterAddEmployee')
      cy.route({
        url: '/employee',
        method: 'POST',
        status: 200,
        response: {}
      })
      typeAndValidateNewEmployeeForm();
      cy.get('form')
        .submit();

      cy.get('tr').as('rows')
      cy.get('@rows')
        .should('have.length', 6)
        .and('contain', '1')
        .and('contain', 'Test')
        .and('contain', 'Test')
        .and('contain', 'SDEIII')
        .and('contain', 'Java')
        .and('contain', 'Android')
        .and('contain', 'Uav')
    })

    it('Form submit after filling employee info and should see success snackbar', () => {
      cy.route('GET', '/employee', 'fixture:employeesAfterAddEmployee')
      cy.route({
        url: '/employee',
        method: 'POST',
        status: 200,
        response: {}
      })
      typeAndValidateNewEmployeeForm();
      cy.get('form')
        .submit();

      cy.get('#client-snackbar')
        .should("have.text", Messages.ADD_EMPLOYEE_SUCCESS)
    })

    it('Form submit after adding duplicate emp id should see error snackbar', () => {
      const error = 'Record Already Exists';
      cy.route({
        url: '/employee',
        method: 'POST',
        status: 500,
        response: {
          message: error
        }
      })
      typeAndValidateNewEmployeeForm();
      cy.get('form')
        .submit();

      cy.get('#client-snackbar')
        .should("have.text", error)
    })

    it('Form submit and has network error should see error snackbar', () => {
      const error = 'Sorry, something went wrong';
      cy.route({
        url: '/employee',
        method: 'POST',
        status: 400,
        response: ''
      })
      typeAndValidateNewEmployeeForm();
      cy.get('form')
        .submit();

      cy.get('#client-snackbar')
        .should("have.text", error)
    })

    it('Form submit and does not fill all required fields should not submit', () => {
      cy.get('#add_employee')
        .click()

      cy.get('#employee_submit')
        .click()

      cy.get('form')
        .should('be.visible')
    })

    it('Does not submit form and click cancel and should not see dialog form', () => {
      cy.get('#add_employee')
        .click()

      cy.get('#employee_cancel')
        .click()

      cy.get('form')
        .should('not.be.visible')
    })
  })

  context('Edit Employee Dialog', () => {
    beforeEach(() => {
      localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
      cy.seedAndVisit()
      cy.get('tr')
        .eq(2)
        .find('#edit')
        .click()
    })

    it('Click on Edit employee dialog form should be visible', () => {
      cy.get('form')
        .should('be.visible')
    })

    it('Click on edit employee dialog form should see Update Employee title', () => {
      cy.get('.EmployeeInfoDialog-main-381')
        .find('h1')
        .should('have.text', 'Update Employee')
    })

    it('Click on Edit employee dialog form should be pre populated with data', () => {
      cy.get('#emp_id')
        .should('have.value', '2345')
        .and('be.disabled')

      cy.get('#first_name')
        .should('have.value', 'Shashank');
      cy.get('#last_name')
        .should('have.value', 'Sheela');
      cy.get('#designation')
        .should('have.value', 'Principle SDE');

      cy.get('.MultiSelector-valueContainer-464 span')
        .should('contain', 'Java')
        .should('contain', 'Aws')
        .should('contain', 'React')
        .should('contain', 'AdmitAlly')
    });

    it('Form submit after updating employee info and should see updated record', () => {
      cy.get('#last_name')
        .clear()
        .type('Hello')

      cy.route('GET', '/employee', 'fixture:employeesAfterEditEmployee.json')
      cy.route({
        url: '/employee/update/3',
        method: 'PUT',
        status: 200,
        response: {}
      })

      cy.get('form')
        .submit();
      cy.get('tr').as('rows')
      cy.get('@rows')
        .and('contain', 'Hello')
    })

    it('Form submit after updated employee info and should see success snackbar', () => {
      cy.route('GET', '/employee', 'fixture:employeesAfterEditEmployee.json')
      cy.route({
        url: '/employee/update/3',
        method: 'PUT',
        status: 200,
        response: {}
      })

      cy.get('#last_name')
        .clear()
        .type('Hello')

      cy.get('form')
        .submit();
      cy.get('#client-snackbar')
        .should("have.text", Messages.UPDATE_EMPLOYEE_SUCCESS)
    })

    it('Update Form submit and has network error should see error snackbar', () => {
      const error = 'Sorry, something went wrong';
      cy.route({
        url: '/employee/update/3',
        method: 'PUT',
        status: 400,
        response: ''
      })

      cy.get('form')
        .submit();

      cy.get('#client-snackbar')
        .should("have.text", error)
    })

    it('Does not submit update form and click cancel and should not see dialog form', () => {
      cy.get('#employee_cancel')
        .click()

      cy.get('form')
        .should('not.be.visible')
    })
  })

  context('Delete Employee', () => {
    beforeEach(() => {
      localStorage.setItem(CURRENT_USER, "saketh.kokonda@zemosolabs.com")
      cy.seedAndVisit()
      cy.get('tr')
        .eq(3)
        .find('#delete')
        .click()
    })

    it('Click on delete employee confirmation dialog should be visible', () => {
      cy.get('.MuiDialog-container-369')
        .should('be.visible')
    })

    it('Click on delete employee confirmation dialog title and description should be visible', () => {
      cy.get('.MuiDialog-container-369 h6')
        .should('have.text', 'Confirm')

      cy.get('.MuiDialog-container-369 span')
        .should('contain', 'Are you sure you want to delete this employee')
    })

    it('Delete an employee and employee should not be there in employee table', () => {
      cy.route('GET', '/employee', 'fixture:employeesAfterDeleteEmployee')
      cy.route({
        url: '/employee/delete/4',
        method: 'DELETE',
        status: 200,
        response: {}
      })

      cy.get('tr').as('rows')
      cy.get('@rows')
        .should('have.length', 5)
        .and('contain', 'test')

      cy.get('.MuiDialog-container-369 button')
        .eq(0)
        .click()

      cy.get('tr').as('rows')
      cy.get('@rows')
        .should('have.length', 4)
        .and('not.contain', 'test')
    })

    it('Form submit after filling employee info and should see success snackbar', () => {
      cy.route('GET', '/employee', 'fixture:employeesAfterDeleteEmployee')
      cy.route({
        url: '/employee/delete/4',
        method: 'DELETE',
        status: 200,
        response: {}
      })

      cy.get('.MuiDialog-container-369 button')
        .eq(0)
        .click()

      cy.get('#client-snackbar')
        .should("have.text", Messages.DELETE_EMPLOYEE_SUCCESS)
    })

    it('Form submit and has network error should see error snackbar', () => {
      const error = 'Sorry, something went wrong';
      cy.route({
        url: '/employee/delete/4',
        method: 'DELETE',
        status: 400,
        response: ''
      })

      cy.get('.MuiDialog-container-369 button')
        .eq(0)
        .click()

      cy.get('#client-snackbar')
        .should("have.text", error)
    })

    it('Click on delete and click cancel and should not see confirm dialog', () => {
      cy.get('.MuiDialog-container-369 button')
        .eq(1)
        .click()

      cy.get('.MuiDialog-container-369')
        .should('not.be.visible')
    })
  })
})

function typeAndValidateNewEmployeeForm() {
  cy.fixture('addEmployee.json').then((addEmployee) => {
    cy.get('#add_employee')
      .click();
    cy.get('#emp_id')
      .type(addEmployee.empId)
      .should('have.value', addEmployee.empId);
    cy.get('#first_name')
      .type(addEmployee.firstName)
      .should('have.value', addEmployee.firstName);
    cy.get('#last_name')
      .type(addEmployee.lastName)
      .should('have.value', addEmployee.lastName);
    cy.get('#designation')
      .type(addEmployee.designation)
      .should('have.value', addEmployee.designation);
    cy.get('#react-select-2-input')
      .type('And{enter}', { force: true })
      .type('Jav{enter}', { force: true });
    cy.get('#react-select-3-input')
      .type('Uav{enter}', { force: true });
  });
}
