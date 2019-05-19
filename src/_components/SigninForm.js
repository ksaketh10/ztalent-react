import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import SnackBar from './SnackBar';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    }
});

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackBarOpen: false,
            variant: "success",
            message: ""
        };
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
            password: this.state.password,
            snackBarOpen: false,
            variant: "success",
            message: ""
        });
    }

    onChangePassword = (event) => {
        this.setState({
            email: this.state.email,
            password: event.target.value,
            snackBarOpen: false,
            variant: "success",
            message: ""
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            snackBarOpen: nextProps.snackbar ? nextProps.snackbar.snackBarOpen : false,
            variant: nextProps.snackbar ? nextProps.snackbar.variant : "success",
            message: nextProps.snackbar ? nextProps.snackbar.message : ""
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {this.props.header}
                        </Typography>
                        <form className={classes.form} onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChangeEmail} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">{this.props.passwordHint}</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onChangePassword} />
                            </FormControl>
                            {this.props.submitComponent}
                        </form>
                    </Paper>
                </main>
                <SnackBar
                    open={this.state.snackBarOpen}
                    variant={this.state.variant}
                    message={this.state.message}
                />
            </div>
        );
    }
}

function mapsStateToProps(state) {
    const { snackbar } = state.snackbar;
    return {
        snackbar
    };
}

export default connect(mapsStateToProps)(
    withStyles(styles)(SigninForm)
);

