import { CHECK_USER_URL, CURRENT_USER } from "../_constants/UriConstants"
import Axios from "axios";

export const userService = {
    checkUser,
    logout
};

function checkUser(user) {
    const loginOptions = {
        method: 'POST',
        url: CHECK_USER_URL,
        headers: { 'Content-Type': 'application/json' },
        data: user
    };

    return Axios(loginOptions)
        .then((response) => handleResponse(response))
        .catch((error) => handleResponse(error.response));
}

function logout() {
   
    localStorage.removeItem(CURRENT_USER);
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        localStorage.removeItem('access_token');
    }
    let refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        localStorage.removeItem('refresh_token');
    }

}

function handleResponse(response) {
    let data = response.data;
    if (response.status !== 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
        }
        const error = (data && data.message);
        return Promise.reject(error);
    } else if (data != null && data.accessToken && data.refreshToken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
    }
    return response;
}