import Axios from "axios";
import { EMPLOYEES_URL } from "../_constants/UriConstants";
import { generateRequestOptions, authHeader } from "../_helpers/auth-header";

export function getAllEmployees() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'), 'Content-Type': 'application/json' }
    const requestOptions = generateRequestOptions('GET', EMPLOYEES_URL, null, headers)
    return Axios(requestOptions)
}

export function createNewEmployee(employee) {
    const formData = {
        'empId': employee.empId,
        'firstName': employee.firstName,
        'lastName': employee.lastName,
        'designation': employee.designation,
        'skills': employee.skills,
        'projectAssigned': employee.projectAssigned,
        'projects': employee.projects
    };

    return authHeader()
        .then(headers => {
            const requestOptions = generateRequestOptions('POST', EMPLOYEES_URL, formData, headers)
            return Axios(requestOptions)
        })
}

export function updateEmployee(employee) {
    const formData = {
        'empId': employee.empId,
        'firstName': employee.firstName,
        'lastName': employee.lastName,
        'designation': employee.designation,
        'skills': employee.skills,
        'projectAssigned': employee.projectAssigned,
        'projects': employee.projects
    };

    return authHeader()
        .then(headers => {
            const requestOptions = generateRequestOptions('PUT', EMPLOYEES_URL + `/${employee.id}`, formData, headers)
            return Axios(requestOptions)
        })
}

export function deleteEmployee(id) {
    return authHeader()
        .then(headers => {
            const requestOptions = generateRequestOptions('DELETE', EMPLOYEES_URL + `/${id}`, null, headers)
            return Axios(requestOptions)
        })
}
