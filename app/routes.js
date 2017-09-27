/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import App from './containers/App';
import BrowsePage from './containers/BrowsePage';
import GamePage from './containers/GamePage';

const Routes = ({ history }) => (
  <App history={history}>
    <Switch>
      <Route path="/games/:id" component={GamePage} />
      <Route path="/" component={BrowsePage} />
    </Switch>
  </App>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
