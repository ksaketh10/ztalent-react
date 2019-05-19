import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit
    },
    padding: {
        paddingRight: 15
    }
});

class CreateNewRecordButton extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container >
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={2} container justify="flex-end">
                        <Fab variant="extended" className={classes.fab} href="/skill">
                            <AddIcon />
                            <Typography variant="caption" color="inherit">Add Skill</Typography>
                        </Fab>
                    </Grid>
                    <Grid item xs={2} container justify="flex-end" >
                        <Fab variant="extended" className={classes.fab} href="/project">
                            <AddIcon />
                            <Typography variant="caption" color="inherit">Add Project</Typography>
                        </Fab>
                    </Grid>
                    <Grid item xs={2} container justify="flex-end" className={classes.padding} onClick={this.props.handleClick}>
                        <Fab variant="extended" className={classes.fab}>
                            <AddIcon />
                            <Typography variant="caption" color="inherit">Add Employee</Typography>
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CreateNewRecordButton);