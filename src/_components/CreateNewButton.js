import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Typography } from '@material-ui/core';

const CreateNewButton = (props) => (
    <Fab variant="extended" href={props.href} onClick={props.onClick}>
        <AddIcon />
        <Typography variant="caption" color="inherit">{props.name}</Typography>
    </Fab>
)

export default CreateNewButton;