import React, { Component } from "react";
import { Paper, ListItem, List, ListItemText, Typography } from "@material-ui/core";

class ItemsList extends Component {

  state = {
    items: []
  }

  componentWillReceiveProps(nextProps, nextContext) {
      this.setState({
        items: nextProps.items
      })
  }

  render() {
    return (
      <List>
        <Paper>
          {this.state.items.map(item => (
            <ListItem key={item.toString()}>
              <ListItemText>
                <Typography
                  variant="body2">
                  {item}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </Paper>
      </List>
    )
  }
};
export default ItemsList;