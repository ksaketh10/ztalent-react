import Axios from "axios";
import { SKILLS_URL, AUTH_USER, AUTH_PASS, DELETE_SKILL_URL } from "../_constants/UriConstants";

export function getAllSkills() {
    return Axios(SKILLS_URL);
}

export function createSkill(skill) {
    let headers = { 'content-type': 'application/json' };
    const formData = {
        'tag': skill
    };

    return Axios.post(SKILLS_URL, formData, {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers
    });
}

export function deleteSkill(id) {
    let headers = { 'content-type': 'application/json' };
    
    return Axios.delete(DELETE_SKILL_URL+`${id}`,  {
        auth: {
            username: AUTH_USER,
            password: AUTH_PASS
        },
        headers: headers
    });
}

