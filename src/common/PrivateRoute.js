import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { CURRENT_USER } from '../_constants/UriConstants';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(CURRENT_USER) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
export default PrivateRoute