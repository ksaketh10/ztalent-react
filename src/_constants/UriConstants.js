export const API_BASE_URL = 'https://ztalent.gq:8443';
//export const API_BASE_URL = 'http://localhost:8080';
export const CURRENT_USER = 'currentUser';

// Employee Urls
export const EMPLOYEES_URL = API_BASE_URL + "/employee"

// Skill Urls
export const SKILLS_URL = API_BASE_URL + "/skill"

// Project Urls
export const PROJECTS_URL = API_BASE_URL + "/project"

// User Auth Urls
export const CREATE_USER_URL = API_BASE_URL + "/user/create"
export const CHECK_USER_URL = API_BASE_URL + "/auth/login"
export const REFRESH_TOKEN_URL = API_BASE_URL + "/auth/refresh"
