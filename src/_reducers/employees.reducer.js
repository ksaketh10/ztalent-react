import { ApiConstants } from "../_constants/ApiConstants";

export function allEmployees(state = {}, action) {
    switch (action.type) {
        case ApiConstants.FETCH_ALL_EMPLYOEES:
            return {
                employees : action.data
            };
        default:
            return state;
    }
}