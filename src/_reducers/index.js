import { combineReducers } from 'redux';
import { employees } from './employees.reducer';
import { skills } from './skills.reducer';
import { projects } from './projects.reducer';
import { user } from './user.reducer';
import { snackbar } from './snackbar.reducer';

export const rootReducer = combineReducers({
    skills,
    employees,
    projects,
    user,
    snackbar
});

export default rootReducer;