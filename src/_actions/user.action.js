import { userService } from "../_services/UserService";
import { UserActions } from "../_constants/UserActionConstants";
import { showSnackBar } from "./snackbar.action";
import { Messages } from "../_constants/Messages";

export function createUser(user) {
    return dispatch => {
       userService.createNewUser(user)
            .then(
                data => {
                    dispatch(fetchData(data));
                },
                error => {
                    dispatch(snackbar("error", getErrorMessage(error.response)));
                }
            );
    };
    
    function fetchData(data) {
        return { type: UserActions.CREATE_USER, data: data }
    }
}

export function validateUser(user) {
    return dispatch => {
        userService.checkUser(user)
            .then(
                data => {
                    dispatch(fetchData(data));
                },
                error => {
                    dispatch(snackbar("error", getErrorMessage(error)));
                }
            );
    };

    function fetchData(data) {
        return { type: UserActions.VALIDATE_USER, data: data }
    }
}

function getErrorMessage(error) {
    return ( error  && error !== "") ? error : Messages.GENERIC_ERROR;
}

function snackbar(variant, message) {
    return showSnackBar({
        variant : variant,
        open: true,
        message : message
      });
}