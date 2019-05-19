import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { Paper, Button, Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        margin: 20,
        padding: 20,
        maxWidth: 400
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

class InputItem extends Component {

    state = {
        item: ""
    };

    onChangeItem = (event) => {
        event.preventDefault()
        this.setState({ item: event.target.value })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <form onSubmit={e => this.props.handleSubmit(e, this.state.item)} className={classes.form}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name={this.props.name}
                                label={this.props.name}
                                onChange={this.onChangeItem}
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                className="add"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}
export default withStyles(styles)(InputItem);