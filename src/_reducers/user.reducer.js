import { UserActions } from "../_constants/UserActionConstants";

export function user(state = {}, action) {
    switch (action.type) {
        case UserActions.CREATE_USER:
            return {
                user : action.data
            };
        default:
            return state;
    }
}

export function validateUser(state = {}, action) {
    switch (action.type) {
        case UserActions.VALIDATE_USER:
            return {
                user : action.data
            };
        default:
            return state;
    }
}