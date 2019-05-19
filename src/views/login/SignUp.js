import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../_actions/user.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SigninForm from '../../_components/SigninForm';
import { Button, withStyles, Typography } from '@material-ui/core';
import { CURRENT_USER } from '../../_constants/UriConstants';
import { Messages } from '../../_constants/Messages';

const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
})

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            url: "",
            error: "",
            showError: false
        };
        localStorage.removeItem(CURRENT_USER)
    }

    handleSignUp = (event, user) => {
        event.preventDefault();
        let newState;
        if (!/(\W|^)[\w.+-]*@zemosolabs\.com(\W|$)/ig.test(user.email)) {
            newState = {
                error: Messages.INVALID_EMAIL,
                showError: true
            };
        } else if (user.password.length <=6) {
            newState = {
                error: Messages.InVALID_PASSWORD,
                showError: true
            };
        } else {
            newState = {
                error: "",
                showError: false
            };
            this.props.createUser(user);
        }
        this.setState(newState)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            redirect: true,
            url: "/login"
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.url} />
        }
    }

    render() {
        const { classes } = this.props;
        const submitComponent = (<Fragment>
            <br />
                <Typography align="center">{this.state.error}</Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
</Button>

        </Fragment>);

        return (
            <div>
                {this.renderRedirect()}
                <SigninForm
                    header="Sign Up"
                    passwordHint="SET PASSWORD"
                    handleSubmit={this.handleSignUp}
                    submitComponent={submitComponent}>
                </SigninForm>
            </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapsStateToProps(state) {
    const { user } = state.user;
    return {
        user
    };
}

const connectedSignUp = connect(mapsStateToProps, { createUser })(withStyles(styles)(SignUp));

export default connectedSignUp;
