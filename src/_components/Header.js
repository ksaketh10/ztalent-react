import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import zemosoIcon from '../_images/zemoso-logo.svg'
import { Grid, Avatar } from '@material-ui/core';
import AccountLogoutSelect from './AccountLogoutSelect';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        paddingTop: 12
    },
    imageLogo: {
        position: 'absolute',
        paddingTop: 10
    },
    shadow: { boxShadow: 'none' }
};

function Header(props) {
    const { classes } = props;
    document.title="Z-Talent";
    return (
        <AppBar position="static" color="default" className={classes.shadow}>
            <Toolbar>
                <Grid container spacing={24}>
                    <Grid item xs={1} container justify="flex-end">
                        <Avatar alt="Remy Sharp" src={zemosoIcon} className={classes.imageLogo} />
                    </Grid>
                    <Grid item xs={4} container justify="flex-start">
                        <Typography variant="h6" id = "title" color="inherit" className={classes.grow}>
                            Z-Talent
                        </Typography>
                    </Grid>
                    <Grid item xs={7} container justify="flex-end">
                        <AccountLogoutSelect onLogOut={props.onLogOut} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
