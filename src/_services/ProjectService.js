import Axios from "axios";
import { PROJECTS_URL } from "../_constants/UriConstants";
import { generateRequestOptions, authHeader } from "../_helpers/auth-header";

export function getAllProjects() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'), 'Content-Type': 'application/json' }
    const requestOptions = generateRequestOptions('GET', PROJECTS_URL, null, headers)
    return Axios(requestOptions)

}

export function createProject(project) {
    const formData = {
        'title': project
    };
    return authHeader()
        .then(headers => {
            const requestOptions = generateRequestOptions('POST', PROJECTS_URL, formData, headers)
            return Axios(requestOptions)
        })
}

// export function deleteProject(id) {
//     let headers = { 'content-type': 'application/json' };

//     return Axios.delete(DELETE_PROJECT_URL+`${id}`,  {
//         auth: {
//             username: AUTH_USER,
//             password: AUTH_PASS
//         },
//         headers: headers
//     });
// }
