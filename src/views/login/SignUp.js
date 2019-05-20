import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../_actions/user.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SigninForm from '../../_components/SigninForm';
import { Button, withStyles, Typography } from '@material-ui/core';
import { CURRENT_USER } from '../../_constants/UriConstants';
import { Messages } from '../../_constants/Messages';
import SnackBar from '../../_components/CustomizedSnackbar';

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
            error: ""
        };
        localStorage.removeItem(CURRENT_USER)
    }

    handleSignUp = (event, user) => {
        event.preventDefault();
        let zemosoEmailRegEx = /(\W|^)[\w.+-]*@zemosolabs\.com(\W|$)/ig;//RegEx to validate zemoso email
        let error = "";
        if (!zemosoEmailRegEx.test(user.email)) {
            error = Messages.INVALID_EMAIL;
        } else if (user.password.length < 6) {
            error = Messages.INVALID_PASSWORD;
        } else {
            this.props.createUser(user);
        }
        this.setState({ error });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.user) {
            this.setState({
                redirect: true,
                url: "/login"
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
            <Typography
                align="center"
                color="error"
            >
                {this.state.error}
            </Typography>
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
                    submitComponent={submitComponent}
                />
                <SnackBar />
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
