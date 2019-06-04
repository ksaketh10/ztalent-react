import { UserActions } from "../_constants/UserActionConstants";

export function skills(state = {}, action) {
    switch (action.type) {
        case UserActions.FETCH_ALL_SKILLS:
            return {
                skills : action.data
            };
        default:
            return state;
    }
}