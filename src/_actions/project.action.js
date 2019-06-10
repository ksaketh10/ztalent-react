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
                    dispatch(snackbar("error", getErrorMessage(error.response)));
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
                    dispatch(snackbar("error", getErrorMessage(error.response)));
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
