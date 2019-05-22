import React, { Component } from "react";
import Header from "../../_components/Header";
import { withStyles } from "@material-ui/core/styles";
import EmployeeSkillDataTable from "../../_components/EmployeeSkillDataTable";
import { Grid } from "@material-ui/core";
import EmployeeInfoDialog from "../../_components/EmployeeInfoDialog";
import { UserActions } from "../../_constants/UserActionConstants";
import Snackbar from "../../_components/CustomizedSnackbar";
import CreateNewButton from "../../_components/CreateNewButton";

const styles = {
    root: {
        flexGrow: 1,
        height: "100%"
    },
    card: {
        height: 290,
        width: 280
    },
    gridContainer: {
        height: "100%",
        margin: 0,
        width: "100%"
    },
    box: {
        borderRadius: 0
    },
    margin: {
        marginLeft: 20,
        marginRight: 20
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState();
    }

    handleEditEmployeeClick = (employee) => {
        this.setState({
            open: true,
            id: employee.id,
            empId: employee.empId,
            firstName: employee.firstName,
            lastName: employee.lastName,
            designation: employee.designation,
            skills: employee.skills,
            projects: employee.projects,
            projectAssigned: employee.projectAssigned,
            mode: UserActions.UPDATE_EMPLOYEE
        })
    }

    handleDialogClose = () => {
        this.setState({
            open: false
        })
    }

    handleNewEmployeeClick = () => {
        let state = this.resetState();
        state.open = true;
        this.setState(state);
    }

    resetState = () => {
        return {
            open: false,
            id: null,
            empId: null,
            firstName: "",
            lastName: "",
            designation: "",
            skills: "",
            projects: "",
            projectAssigned: false,
            mode: UserActions.CREATE_NEW_EMPLOYEE
        };
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={10}>
                        <Grid container >
                            <Grid item xs={10}>
                            </Grid>
                            <Grid item xs={2} container justify="center">
                                <CreateNewButton
                                    name="Add Employee"
                                    onClick={this.handleNewEmployeeClick}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={this.props.classes.margin}>
                        <EmployeeSkillDataTable handleEditEmployeeClick={this.handleEditEmployeeClick} />
                    </Grid>
                </Grid>
                <EmployeeInfoDialog
                    id={this.state.id}
                    empId={this.state.empId}
                    handleClose={this.handleDialogClose}
                    openDialog={this.state.open}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    designation={this.state.designation}
                    skills={this.state.skills}
                    projects={this.state.projects}
                    projectAssigned={this.state.projectAssigned}
                    mode={this.state.mode}
                />
                <Snackbar />
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);