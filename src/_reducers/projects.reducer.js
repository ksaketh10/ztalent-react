import { UserActions } from "../_constants/UserActionConstants";

export function projects(state = {}, action) {
    switch (action.type) {
        case UserActions.FETCH_ALL_PROJECTS:
            return {
                projects : action.data
            };
        default:
            return state;
    }
}