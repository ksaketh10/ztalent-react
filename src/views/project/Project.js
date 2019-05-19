import React, { Component } from "react";
import { Typography, Fab } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Header from "../../_components/Header";
import { connect } from "react-redux";
import { getProjects, insertNewProject, deleteExistingProject } from "../../_actions/project.action"
import ItemsList from "../../_components/ItemsList";
import InputItem from "../../_components/InputItem";
import SnackBar from "../../_components/SnackBar";
import HomeIcon from '@material-ui/icons/HomeRounded';

const styles = {
    root: {
        margin: 20,
        maxWidth: 400
    },
    grid: {
        height: 50
    },
    fab: {
        margin: 20
    },
}

class Project extends Component {

    state = {
        projects: [],
        snackBarOpen: false,
        variant: "success",
        message: ""
    }

    componentWillMount() {
        this.props.getProjects();
    }

    handleSubmit = (e, project) => {
        e.preventDefault();
        this.props.insertNewProject(project.toUpperCase())
    }

    handleDelete = id => {
        this.props.deleteExistingProject(id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            projects: nextProps.projects.data,
            snackBarOpen: nextProps.snackbar ? nextProps.snackbar.snackBarOpen : false,
            variant: nextProps.snackbar ? nextProps.snackbar.variant : "success",
            message: nextProps.snackbar ? nextProps.snackbar.message : ""
        });
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Header />
                <Grid container spacing={24} >
                    <Grid item xs={12} justify="flex-start" >
                        <Fab variant="extended" className={classes.fab} justify="flex-start" href="/home">
                            <HomeIcon />
                            <Typography className={classes.root} component="h3" variant="h5">Home</Typography>
                        </Fab>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className={classes.root} component="h3" variant="h5">Add a new project</Typography>
                        <InputItem
                            name="Project"
                            handleSubmit={this.handleSubmit} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography className={classes.root} component="h3" variant="h5">projects</Typography>
                        <ItemsList items={this.state.projects} />
                    </Grid>
                </Grid>
                <SnackBar
                    open={this.state.snackBarOpen}
                    variant={this.state.variant}
                    message={this.state.message}
                />
            </div>
        )
    }
}

function mapsStateToProps(state) {
    const { projects } = state.projects;
    const { snackbar } = state.snackbar;
    return {
        projects, snackbar
    };
}

export default connect(mapsStateToProps, { getProjects, insertNewProject, deleteExistingProject })(
    withStyles(styles)(Project)
);