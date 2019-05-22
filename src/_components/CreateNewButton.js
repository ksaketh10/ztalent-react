import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { Typography, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    }
  });

const CreateNewButton = (props) => (
    <Button variant="contained" color="primary" className={props.classes.button} href={props.href} onClick={props.onClick}>
        <AddIcon className={props.classes.leftIcon}/>
        <Typography variant="caption" color="inherit">{props.name}</Typography>
    </Button>
)

export default withStyles(styles)(CreateNewButton);