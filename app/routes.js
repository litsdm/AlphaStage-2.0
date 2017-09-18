/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import BrowsePage from './containers/BrowsePage';
import GamePage from './containers/GamePage';

export default () => (
  <App>
    <Switch>
      <Route path="/games/:id" component={GamePage} />
      <Route path="/" component={BrowsePage} />
    </Switch>
  </App>
);
