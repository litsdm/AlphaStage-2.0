// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import client from '../client';

const rootReducer = combineReducers({
  apollo: client.reducer(),
  router,
});

export default rootReducer;
