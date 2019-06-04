import Axios from "axios";
import { PROJECTS_URL, DELETE_PROJECT_URL, AUTH_USER, AUTH_PASS } from "../_constants/UriConstants";

export function getAllProjects() {
    return Axios(PROJECTS_URL)
}

export function createProject(project) {
    let headers = { 'content-type': 'application/json' };
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

export function deleteProject(id) {
    let headers = { 'content-type': 'application/json' };
    
    return Axios.delete(DELETE_PROJECT_URL+`${id}`,  {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers
    });
}
