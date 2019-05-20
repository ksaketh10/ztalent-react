import { getAllSkills, createSkill, deleteSkill } from "../_services/SkillService"
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
                    dispatch(snackbar("error", getErrorMessage(error.response)));
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
                    dispatch(snackbar("error", getErrorMessage(error.response)));
                }
            );
    };
}

export function deleteExistingSkill(id) {
    return dispatch => {
        deleteSkill(id)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.DELETE_SKILL_SUCCESS));
                    this.getSkills();
                },
                error => {
                    dispatch(snackbar("error", getErrorMessage(error.response)));
                }
            );
    };
}

function getErrorMessage(error) {
    return (error && error.data) ? error.data.message : Messages.GENERIC_ERROR;
}

function snackbar(variant, message) {
    return showSnackBar({
        variant: variant,
        open: true,
        message: message
    });
}
