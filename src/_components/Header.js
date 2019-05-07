import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import zemosoIcon from '../_images/zemoso-logo.svg'
import { Grid, Avatar } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    imageLogo: {
        position: 'absolute'
    }
};

function Header(props) {
    const { classes } = props;
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid container spacing={24}>
                    <Grid item xs={2} alignItems='center'>
                        <Avatar alt="Remy Sharp" src={zemosoIcon} className={classes.imageLogo} />
                    </Grid>
                    <Grid item xs={6}  alignItems='left'>

                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            ZE - TALENT
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Saketh
                        <AccountCircle />
                        </Typography>
                    
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
