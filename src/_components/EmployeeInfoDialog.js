import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { connect } from 'react-redux'
import { createEmployee, editEmployee } from "../_actions/employee.action";
import { getSkills, insertNewSkill } from "../_actions/skill.action";
import { getProjects, insertNewProject } from "../_actions/project.action";
import { withStyles, Typography, FormControl, Grid } from '@material-ui/core';
import MultiSelector from './MultiSelector'
import { UserActions } from '../_constants/UserActionConstants';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  form: {
    width: '100%',
  }
})

class EmployeeInfoDialog extends React.Component {

  state = {
    open: false,
    allSkills: [],//for populating skills dropdown
    allProjects: [],//for populating projects dropdown
    id: "",
    empId: "",
    firstName: "",
    lastName: "",
    designation: "",
    skills: [],//skills that user has selected
    projects: [],//projects that user has selected
    projectAssigned: false,
    mode: UserActions.CREATE_NEW_EMPLOYEE
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.handleClose();
  };

  onChangeEmpId = (event) => {
    this.setNewState('empId', event.target.value);
  }

  onChangeFirstName = (event) => {
    this.setNewState('firstName', event.target.value);
  }

  onChangeLastName = (event) => {
    this.setNewState('lastName', event.target.value);
  }

  onChangeDesignation = (event) => {
    this.setNewState('designation', event.target.value);
  }

  handleSelectedSkills = (skills) => {
    this.setNewState('skills', skills);
  }

  handleSelectedProjects = (projects) => {
    this.setNewState('projects', projects);
  }

  setNewState = (key, value) => {
    let newState = {
      id: this.state.id,
      empId: this.state.empId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      designation: this.state.designation,
      skills: this.state.skills,
      projects: this.state.projects,
      projectAssigned: (key === 'projects' ? value.length !== 0 : this.state.projectAssigned),//if user doesn't select any project the field is false
      mode: this.state.mode
    }
    newState[key] = value;
    this.setState(newState);
  }

  handleOkay = (e) => {
    e.preventDefault();
    let empRequest = {
      empId: this.state.empId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      designation: this.state.designation,
      skills: this.state.skills,
      projects: this.state.projects,
      projectAssigned: this.state.projectAssigned
    };
    if (this.state.mode === UserActions.CREATE_NEW_EMPLOYEE) {
      this.props.createEmployee(empRequest);
    } else if (this.state.mode === UserActions.UPDATE_EMPLOYEE) {
      empRequest.id = this.state.id;
      this.props.editEmployee(empRequest);
    }
    this.handleClose();
  }

  componentWillMount() {
    this.props.getSkills();
    this.props.getProjects();
  }

  onAddNewSkill = (value) => {
    this.props.insertNewSkill(value)
  }

  onAddNewProject = (value) => {
    this.props.insertNewProject(value)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if ((nextProps.allSkills && nextProps.allSkills.data.length !== this.state.allSkills.length)
      || (nextProps.allProjects && nextProps.allProjects.data.length !== this.state.allProjects.length)) {
      this.setState({
        open: nextProps.openDialog,
        allSkills: nextProps.allSkills ? nextProps.allSkills.data : this.state.allSkills,
        allProjects: nextProps.allProjects ? nextProps.allProjects.data : this.state.allProjects
      });
    } else {
      this.setState({
        open: nextProps.openDialog,
        id: nextProps.id,
        empId: nextProps.empId || "",
        firstName: nextProps.firstName,
        lastName: nextProps.lastName,
        designation: nextProps.designation,
        skills: nextProps.skills || [],
        projects: nextProps.projects || [],
        projectAssigned: nextProps.projectAssigned,
        mode: nextProps.mode
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth={'sm'}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <main className={classes.main}>
              <Typography component="h1" variant="h5">
                {this.state.mode}
              </Typography>
              <form className={classes.form} onSubmit={this.handleOkay}>
                <FormControl fullWidth>
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    type="number"
                    id="emp_id"
                    disabled={this.state.mode === UserActions.UPDATE_EMPLOYEE}
                    value={this.state.empId}
                    onChange={this.onChangeEmpId}
                    label="Employee Id"
                    fullWidth
                  />
                </FormControl>
                <FormControl required fullWidth>
                  <TextField
                    required
                    margin="dense"
                    id="first_name"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    label="First Name"
                    fullWidth
                  />
                </FormControl>
                <FormControl required fullWidth>
                  <TextField
                    margin="dense"
                    id="last_name"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    label="Last Name"
                    fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <MultiSelector
                    id="skills"
                    items={this.state.allSkills}
                    selectedItems={this.state.skills}
                    handleSelectedItems={this.handleSelectedSkills}
                    name="skills"
                    placeholder="Select multiple skills"
                    onAddNewItem={this.onAddNewSkill}
                    noOptionsMessage="Add this skill"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <MultiSelector
                    id="projects"
                    items={this.state.allProjects}
                    selectedItems={this.state.projects}
                    handleSelectedItems={this.handleSelectedProjects}
                    name="projects"
                    placeholder="Select multiple projects"
                    onAddNewItem={this.onAddNewProject}
                    noOptionsMessage="Add this project"
                  />
                </FormControl>
                <FormControl required fullWidth>
                  <TextField
                    id="designation"
                    required
                    margin="dense"
                    value={this.state.designation}
                    onChange={this.onChangeDesignation}
                    label="Designation"
                    fullWidth
                  />
                </FormControl>
                <Grid container justify="flex-end">
                  <Button variant="contained" id="employee_submit" type="submit" color="primary">
                    Okay
                  </Button>
                  <Button onClick={this.handleClose} id="employee_cancel" color="primary">
                    Cancel
                   </Button>
                </Grid>
              </form>
            </main>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapsStateToProps(state) {
  const { skills } = state.skills;
  const { projects } = state.projects;
  return {
    allSkills: skills,
    allProjects: projects
  };
}

export default connect(mapsStateToProps, { getSkills, insertNewSkill, createEmployee, editEmployee, getProjects, insertNewProject })(
  withStyles(styles)(EmployeeInfoDialog)
);

