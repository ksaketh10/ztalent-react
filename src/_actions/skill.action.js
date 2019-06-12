import { getAllSkills, createSkill } from "../_services/SkillService"
import { UserActions } from "../_constants/UserActionConstants"
import { showSnackBar } from "./snackbar.action";
import { Messages } from "../_constants/Messages";

export function getSkills() {
    return dispatch => {
        getAllSkills()
            .then(
                data => {
                    dispatch(fetchData(data));
                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };

    function fetchData(data) {
        return { type: UserActions.FETCH_ALL_SKILLS, data: data }
    }
}

export function insertNewSkill(skill) {
    return dispatch => {
        createSkill(skill)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.ADD_SKILL_SUCCESS));
                    this.getSkills();
                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };
}

// export function deleteExistingSkill(id) {
//     return dispatch => {
//         deleteSkill(id)
//             .then(
//                 data => {
//                     dispatch(snackbar("success", Messages.DELETE_SKILL_SUCCESS));
//                     this.getSkills();
//                 },
//                 error => {
//                     dispatch(snackbar("error", getErrorMessage(error.response)));
//                 }
//             );
//     };
// }

function dispatchError(dispatch, error) {
    if (error) {
        const errorResponse = error.response;
        const error1 = (errorResponse && errorResponse.data) ? errorResponse.data.message : Messages.GENERIC_ERROR;
        dispatch(snackbar("error", error1));
    }
}

function snackbar(variant, message) {
    return showSnackBar({
        variant: variant,
        open: true,
        message: message
    });
}
