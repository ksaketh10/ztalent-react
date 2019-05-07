import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dashboard } from '../dashboard/Dashboard'

const styles = {
    root: {
        height: '100%'
    },
    content: {
        height: '90%'
    }
};

class HomePage extends Component {
  render() {
    return (
        <div className={this.props.classes.root}>
            <div className={this.props.classes.content}>
                <Dashboard/>
            </div>
        </div>
    );
  }
}

export default withStyles(styles)(HomePage);
