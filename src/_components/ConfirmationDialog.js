import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';

class ConfirmationDialogRaw extends React.Component {

    render() {
        const { value, ...other } = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <Typography variant="caption" color="inherit">{this.props.content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.props.handleOk} color="primary">
                        Ok
                    </Button>
                    <Button onClick={this.props.handleCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func
};

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
});

class ConfirmationDialog extends React.Component {
    state = {
        open: false,
    };

    handleCancel = () => {
        this.setState({ open: false });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    open={this.state.open}
                    handleCancel={this.handleCancel}
                    handleOk={this.props.handleOk}
                    content={this.props.content}
                />
            </div>
        );
    }
}

ConfirmationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);
