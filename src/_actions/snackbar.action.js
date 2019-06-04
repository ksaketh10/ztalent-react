import { UserActions } from "../_constants/UserActionConstants"

export function showSnackBar(snackbar) {
    return { type: UserActions.SHOW_SNACKBAR, snackbar };
}
