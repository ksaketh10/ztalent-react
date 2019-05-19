import Axios from "axios";
import { CREATE_USER_URL, CHECK_USER_URL, AUTH_USER, AUTH_PASS } from "../_constants/UriConstants"

export function createNewUser(user) {
    let headers = { 'content-type': 'application/json' };
    const formData = {
        'email': user.email,
        'password': user.password
    };

    return Axios.post(CREATE_USER_URL, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers,
    })
}

export function checkUser(user) {
    let headers = { 'content-type': 'application/json' };
    const formData = {
        'email': user.email,
        'password': user.password
    };

    return Axios.post(CHECK_USER_URL, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers,
    })
}