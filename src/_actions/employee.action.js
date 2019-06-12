import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee } from "../_services/EmployeeService"
import { UserActions } from "../_constants/UserActionConstants"
import { showSnackBar } from "./snackbar.action";
import { Messages } from "../_constants/Messages";

export function getEmployees() {
    return dispatch => {
        retrieveEmployees(dispatch);
    };
}

export function createEmployee(employee) {
    return dispatch => {
        createNewEmployee(employee)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.ADD_EMPLOYEE_SUCCESS));
                    retrieveEmployees(dispatch);
                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };
}

export function editEmployee(employee) {
    return dispatch => {
        updateEmployee(employee)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.UPDATE_EMPLOYEE_SUCCESS));
                    retrieveEmployees(dispatch);
                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };
}

export function deleteExistingEmployee(id) {
    return dispatch => {
        deleteEmployee(id)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.DELETE_EMPLOYEE_SUCCESS));
                    retrieveEmployees(dispatch);

                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };
}

function retrieveEmployees(dispatch) {
    getAllEmployees()
        .then(data => {
            dispatch(fetchData(data));
        }, error => {
            dispatchError(dispatch, error)
        });
}

function fetchData(data) {
    return { type: UserActions.FETCH_ALL_EMPLYOEES, data: data }
}

function dispatchError(dispatch, error) {
    if (error) {
        const errorResponse = error.response;
        const error1 = (errorResponse && errorResponse.data) ? errorResponse.data.message : Messages.GENERIC_ERROR;
        dispatch(snackbar("error", error1));
    }
}

function snackbar(variant, message) {
    return showSnackBar({
        variant: variant,
        open: true,
        message: message
    });
}