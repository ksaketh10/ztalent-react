import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { validateUser } from '../../_actions/user.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CURRENT_USER } from '../../_constants/UriConstants';
import SigninForm from '../../_components/SigninForm';
import { Button, withStyles } from '@material-ui/core';
import SnackBar from '../../_components/CustomizedSnackbar';
import { userService } from '../../_services/UserService';

const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
})

class SignIn extends Component {
    email = "";
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            url: ""
        };
        userService.logout()
    }

    handleSignin = (event, user) => {
        event.preventDefault();
        this.props.validateUser(user);
        this.email = user.email;
    }

    handleSignUp = () => {
        this.setState({
            redirect: true,
            url: "/signup"
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        localStorage.setItem(CURRENT_USER, this.email)
        if (nextProps.user) {
            this.setState({
                redirect: true,
                url: "/home"
            })
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.url} />
        }
    }

    render() {
        const { classes } = this.props;
        const submitComponent = (<Fragment>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign in

            </Button>
            {/* <div>
                <br />
                <Typography align="center"> (Or)</Typography>
            </div>
            
            // Sign Up feature to be used in future. Commenting for now
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSignUp}
                className={classes.submit}
            >
                Sign Up
            </Button> */}

        </Fragment>);

        return (
            <div>
                {this.renderRedirect()}
                <SigninForm
                    header="Sign in"
                    passwordHint="PASSWORD"
                    handleSubmit={this.handleSignin}
                    submitComponent={submitComponent}
                />
                <SnackBar />
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapsStateToProps(state) {
    const { user } = state.user;
    return {
        user
    };
}

const connectedSignIn = connect(mapsStateToProps, { validateUser })(withStyles(styles)(SignIn));

export default connectedSignIn;
