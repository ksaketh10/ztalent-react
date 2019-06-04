import { UserActions } from "../_constants/UserActionConstants";

export function employees(state = {}, action) {
    switch (action.type) {
        case UserActions.FETCH_ALL_EMPLYOEES:
            return {
                employees: action.data
            };
        default:
            return state;
    }
}