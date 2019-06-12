import Axios from "axios";
import { SKILLS_URL } from "../_constants/UriConstants";
import { generateRequestOptions, authHeader } from "../_helpers/auth-header";

export function getAllSkills() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'), 'Content-Type': 'application/json' }
    const requestOptions = generateRequestOptions('GET', SKILLS_URL, null, headers)
    return Axios(requestOptions)
}

export function createSkill(skill) {
    const formData = {
        'tag': skill
    };
    return authHeader()
        .then(headers => {
            const requestOptions = generateRequestOptions('POST', SKILLS_URL, formData, headers)
            return Axios(requestOptions)
        })
}

// export function deleteSkill(id) {
//     let headers = { 'content-type': 'application/json' };

//     return Axios.delete(DELETE_SKILL_URL+`${id}`,  {
//         auth: {
//             username: AUTH_USER,
//             password: AUTH_PASS
//         },
//         headers: headers
//     });
// }

