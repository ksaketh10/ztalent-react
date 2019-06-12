import decode from 'jwt-decode';
import Axios from "axios";
import { history } from '../_helpers/history';
import { REFRESH_TOKEN_URL } from '../_constants/UriConstants';

export function authHeader() {
    if (isAccessTokenValid()) {
        return new Promise(function (resolve, reject) {
            resolve({ 'Authorization': 'Bearer ' + getAccessToken(), 'Content-Type': 'application/json' });
        })
    } else if (isRefreshTokenValid()) {
        const refreshTokenOptions = {
            method: 'GET',
            url: REFRESH_TOKEN_URL,
            headers: { 'Authorization': 'Bearer ' + getRefreshToken() }
        };
        return Axios(refreshTokenOptions)
            .then((response) => {
                if (response.data && response.data.refreshToken) {
                    localStorage.setItem('refresh_token', response.data.refreshToken);
                    return { 'Authorization': 'Bearer ' + response.data.refreshToken, 'Content-Type': 'application/json' };
                } else {
                    history.push("/login");
                }
            })
            .catch((error) => history.push("/login"));
    } else {
        history.push("/login");
        return Promise.reject()
    }
}

// Axios.interceptors.request.use(function(config) {
//     //config.headers.ContentType = 'application/json'
//     if (isAccessTokenValid()) {
//         config.headers.Authorization = `Bearer ${getAccessToken()}`
//         return config
//     } else if (isRefreshTokenValid()) {
//         const refreshTokenOptions = {
//             method: 'GET',
//             url: REFRESH_TOKEN_URL,
//             headers: { 'Authorization': 'Bearer ' + getRefreshToken() }
//         };
//         Axios(refreshTokenOptions)
//             .then((response) => {
//                 if (response.data && response.data.refreshToken) {
//                     localStorage.setItem('refresh_token', response.data.refreshToken);
//                     config.headers.Authorization = `Bearer ${getRefreshToken()}`;
//                     return config;
//                 } else {
//                     history.push("/login");
//                 }
//             })
//             .catch((error) => history.push("/login"));
//     } else {
//         history.push("/login");
//     }
//   }, function(err) {
//     return Promise.reject(err);
//   });

export function generateRequestOptions(method, url, data, headers) {
    if (data) {
        return {
            method: method,
            url: url,
            data: data,
            headers: headers
        }
    } else {
        return {
            method: method,
            url: url,
            headers: headers
        }
    }
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function isAccessTokenValid() {
    // Checks if there is a saved token and it's still valid
    let userAccessToken = getAccessToken();
    return userAccessToken && !isTokenExpired(userAccessToken) // handwaiving here
}

export function isRefreshTokenValid() {
    // Checks if there is a saved token and it's still valid
    let refreshToken = getRefreshToken();
    return refreshToken && !isTokenExpired(refreshToken) // handwaiving here
}

function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        const date = Date.now() / 1000;
        return decoded.exp < date;
    }
    catch (err) {
        return false;
    }
}
