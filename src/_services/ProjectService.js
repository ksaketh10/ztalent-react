import Axios from "axios";
import { PROJECTS_URL, AUTH_USER, AUTH_PASS, CURRENT_USER } from "../_constants/UriConstants";

export function getAllProjects() {
    return Axios(PROJECTS_URL)
}

export function createProject(project) {
    let headers = { 'content-type': 'application/json', 'user': localStorage.getItem(CURRENT_USER) };
    const formData = {
        'title': project
    };

    return Axios.post(PROJECTS_URL, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers
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
