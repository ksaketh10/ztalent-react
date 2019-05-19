import Axios from "axios";
import { EMPLOYEES_URL, AUTH_USER, AUTH_PASS, UPDATE_EMPLOYEE_URL, DELETE_EMPLOYEE_URL } from "../_constants/UriConstants";

export function getAllEmployees() {
    return Axios(EMPLOYEES_URL)
}

export function createNewEmployee(employee) {
    let headers = { 'content-type': 'application/json' };
    const formData = {
        'empId':employee.empId,
        'firstName': employee.firstName,
        'lastName': employee.lastName,
        'designation': employee.designation,
        'skills': employee.skills,
        'projectAssigned': employee.projectAssigned,
        'projects': employee.projects
    };

    return Axios.post(EMPLOYEES_URL, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers,
    })
}

export function updateEmployee(employee) {
    let headers = { 'content-type': 'application/json' };
    const formData = {
        'empId':employee.empId,
        'firstName': employee.firstName,
        'lastName': employee.lastName,
        'designation': employee.designation,
        'skills': employee.skills,
        'projectAssigned': employee.projectAssigned,
        'projects': employee.projects
    };

    return Axios.put(UPDATE_EMPLOYEE_URL + `/${employee.id}`, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers,
    })
}

export function deleteEmployee(id) {
    return Axios.delete(DELETE_EMPLOYEE_URL + `/${id}`)
}
