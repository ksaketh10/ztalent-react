export const API_BASE_URL = 'http://ec2-18-236-185-143.us-west-2.compute.amazonaws.com:8080';
export const CURRENT_USER = 'currentUser';

// Employee Urls
export const EMPLOYEES_URL = API_BASE_URL + "/employee"
export const UPDATE_EMPLOYEE_URL = EMPLOYEES_URL + "/update"
export const DELETE_EMPLOYEE_URL = EMPLOYEES_URL + "/delete"

// Skill Urls
export const SKILLS_URL = API_BASE_URL + "/skill"
export const UPDATE_SKILL_URL = SKILLS_URL + "/update"
export const DELETE_SKILL_URL = SKILLS_URL + "/delete"

// Project Urls
export const PROJECTS_URL = API_BASE_URL + "/project"
export const UPDATE_PROJECT_URL = PROJECTS_URL + "/update"
export const DELETE_PROJECT_URL = PROJECTS_URL + "/delete"

// User Auth Urls
export const CREATE_USER_URL = API_BASE_URL + "/user/create"
export const CHECK_USER_URL = API_BASE_URL + "/user/check"

export const AUTH_USER = "user"
export const AUTH_PASS = "e6db4a07-db9b-4592-a702-995eaca71aec"