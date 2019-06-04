import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { Typography, Button } from '@material-ui/core';

class CreateNewButton extends React.Component {

  render() {
    return (
      <Button variant="contained" color="primary" href={this.props.href} onClick={this.props.onClick} {...this.props}>
        <AddIcon />
        <Typography variant="caption" color="inherit">{this.props.name}</Typography>
      </Button>
    )
  }
}

export default (CreateNewButton);