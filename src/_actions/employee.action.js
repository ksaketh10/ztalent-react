import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee } from "../_services/EmployeeService"
import { UserActions } from "../_constants/UserActionConstants"
import { showSnackBar } from "./snackbar.action";
import { Messages } from "../_constants/Messages";

export function getEmployees() {
    return dispatch => {
        getAllEmployees()
            .then(
                data => {
                    dispatch(fetchData(data));
                },
                error => {
                    dispatch(snackbar(error.response));
                }
            );
    };

    function fetchData(data) {
        return { type: UserActions.FETCH_ALL_EMPLYOEES, data: data }
    }
}


export function createEmployee(employee) {
    return dispatch => {
        createNewEmployee(employee)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.ADD_EMPLOYEE_SUCCESS));
                    // this.getEmployees();
                },
                error => {
                    dispatch(snackbar(error.response));
                }
            );
    };
}

export function editEmployee(employee) {
    return dispatch => {
        updateEmployee(employee)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.UPDATE_EMPLOYEE_SUCCESS))
                    // this.getEmployees();
                },
                error => {
                    dispatch(snackbar(error.response));
                }
            );
    };
}

export function deleteEmployees(ids) {
    return dispatch => {
        ids.forEach(id => {
            deleteEmployee(id)
                .then(
                    data => {
                        dispatch(snackbar("success", Messages.DELETE_EMPLOYEE_SUCCESS));
                    },
                    error => {
                        dispatch(snackbar("error", getErrorMessage(error.response)));
                    }
                );
        });
    };
}

function getErrorMessage(error) {
    return (error && error.data) ? error.data.message : Messages.GENERIC_ERROR;
}

function snackbar(variant, message) {
    return showSnackBar({
        variant: variant,
        snackBarOpen: true,
        message: message
    });
}