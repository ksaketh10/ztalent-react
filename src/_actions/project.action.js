import { getAllProjects, createProject } from "../_services/ProjectService"
import { UserActions } from "../_constants/UserActionConstants"
import { showSnackBar } from "./snackbar.action";
import { Messages } from "../_constants/Messages";

export function getProjects() {
    return dispatch => {
        getAllProjects()
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
        return { type: UserActions.FETCH_ALL_PROJECTS, data: data }
    }
}

export function insertNewProject(project) {
    return dispatch => {
        createProject(project)
            .then(
                data => {
                    dispatch(snackbar("success", Messages.ADD_PROJECT_SUCCESS));
                    this.getProjects();
                },
                error => {
                    dispatchError(dispatch, error)
                }
            );
    };
}

// export function deleteExistingProject(id) {
//     return dispatch => {
//         deleteProject(id)
//             .then(
//                 data => {
//                     dispatch(snackbar("success", Messages.DELETE_PROJECT_SUCCESS));
//                     this.getProjects();
//                 },
//                 error => {
//                     dispatch(snackbar("error", getErrorMessage(error.response)));
//                 }
//             );
//     }
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
