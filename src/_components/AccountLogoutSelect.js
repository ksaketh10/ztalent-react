import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Redirect } from 'react-router-dom';
import { Grid, Avatar, Button } from '@material-ui/core';
import { CURRENT_USER } from '../_constants/UriConstants';

const styles = theme => ({
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  grow: {
    flexGrow: 1
  },
  padding: {
    paddingTop: 12
  },
  button: {
    margin: 10,
    height: 40
  }
});

class AccountLogoutSelect extends React.Component {

  constructor(props) {
    super(props);
    let redirect = localStorage.getItem(CURRENT_USER) === ""

    this.state = {
      open: false,
      redirect
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  handleLogout = () => {
    localStorage.removeItem(CURRENT_USER);
    this.setState({
      redirect: true
    })
  }

  render() {
    const { classes } = this.props;
    let user, initials;
    if (localStorage.getItem(CURRENT_USER)) {
      user = localStorage.getItem(CURRENT_USER).split(".");
      initials = user[0].charAt(0) + user[1].match(/^([^.]*)./)[1].charAt(0);
    }
    return (
      <div>
        {this.renderRedirect()}
  
        <Grid container >
          <Grid item xs={2} container justify="flex-end">
            <Avatar className={classes.orangeAvatar}>{initials}</Avatar>
          </Grid>
          <Grid item xs={4} container justify="flex-start">
            <Typography variant="h6" color="inherit" className={classes.padding}>
              {user ? user[0] : ""}
            </Typography>
          </Grid>
          <Grid item xs={6} container justify="flex-end">
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleLogout}>
              Log Out
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AccountLogoutSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountLogoutSelect);