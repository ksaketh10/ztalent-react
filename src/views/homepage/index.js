import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dashboard from '../dashboard';

const styles = {
    root: {
        height: '100%'
    },
    content: {
        height: '90%'
    }
};

const HomePage = (props) => (
    <div className={props.classes.root}>
        <div className={props.classes.content}>
            <Dashboard />
        </div>
    </div>
);

export default withStyles(styles)(HomePage);
