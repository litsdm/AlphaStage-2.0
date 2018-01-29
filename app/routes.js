/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import App from './containers/App';
import BrowsePage from './containers/BrowsePage';
import GamePage from './containers/GamePage';
import CreateGamePage from './containers/CreateGamePage';
import DashboardPage from './containers/DashboardPage';
import CategoryPage from './containers/CategoryPage';

const Routes = ({ history }) => (
  <App history={history}>
    <Switch>
      <Route path="/categories/:category" component={CategoryPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route path="/games/new" component={CreateGamePage} />
      <Route path="/games/edit/:id" component={CreateGamePage} />
      <Route path="/games/:id" component={GamePage} />
      <Route path="/" component={BrowsePage} />
    </Switch>
  </App>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
