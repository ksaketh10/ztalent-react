import { UserActions } from "../_constants/UserActionConstants";

export function snackbar(state = {}, action) {
    switch (action.type) {
        case UserActions.SHOW_SNACKBAR:
            return {
                snackbar: action.snackbar
            }
        default:
            return state;
    }
}