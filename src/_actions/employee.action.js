import { getAllEmployees } from "../_services/EmployeeSkillService"
import { ApiConstants } from "../_constants/ApiConstants"

export function getEmployees() {
    return dispatch => {
        getAllEmployees()
            .then(
                data => {
                    dispatch(fetchData(data));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function failure(error) {
        return { type: ApiConstants.ERROR_IN_FETCH, error }
    }

    function fetchData(data) {
        return { type: ApiConstants.FETCH_ALL_EMPLYOEES, data: data }
    }
}