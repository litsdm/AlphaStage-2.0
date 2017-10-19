import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
