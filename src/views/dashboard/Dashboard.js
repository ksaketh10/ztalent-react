import React, { Component } from "react";
import Header from "../../_components/Header";
import { withStyles } from "@material-ui/core/styles";
import { EmployeeSkillDataTable } from "../../_components/EmployeeSkillDataTable";
import { Grid } from "@material-ui/core";
import CreateNewRecord from "../../_components/CreateNewRecordButton"
import EmployeeInfoDialog from "../../_components/EmployeeInfoDialog";
import { UserActions } from "../../_constants/UserActionConstants";
import { connect } from 'react-redux';
import Snackbar from "../../_components/SnackBar";

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
            mode: UserActions.UPDATE_EMPLOYEE,
            snackBarOpen: false,
            variant: "success",
            message: ""
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
            snackBarOpen: false,
            variant: "success",
            message: "",
            mode: UserActions.CREATE_NEW_EMPLOYEE
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: this.state.open,
            id: this.state.id,
            empId: this.state.empId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            designation: this.state.designation,
            skills: this.state.skills,
            projects: this.state.projects,
            projectAssigned: this.state.projectAssigned,
            mode: this.state.mode,
            snackBarOpen: nextProps.snackbar ? nextProps.snackbar.snackBarOpen : false,
            variant: nextProps.snackbar ? nextProps.snackbar.variant : "success",
            message: nextProps.snackbar ? nextProps.snackbar.message : ""
        })
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <CreateNewRecord handleClick={this.handleNewEmployeeClick} />
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
                    mode={this.state.mode} />
                <Snackbar
                    open={this.state.snackBarOpen}
                    variant={this.state.variant}
                    message={this.state.message}
                />
            </div>
        )
    }
}

function mapsStateToProps(state) {
    const { snackbar } = state.snackbar;
    return {
        snackbar
    };
}

export default connect(mapsStateToProps)(withStyles(styles)(Dashboard));