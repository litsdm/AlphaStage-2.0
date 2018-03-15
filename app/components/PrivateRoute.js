import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { element } from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login'
        }}
        />
    )
  )}
  />
);

PrivateRoute.propTypes = {
  component: element.isRequired
};

export default PrivateRoute;
