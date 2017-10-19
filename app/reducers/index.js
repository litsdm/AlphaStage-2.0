// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import client from '../client';
import user from './user';

const rootReducer = combineReducers({
  apollo: client.reducer(),
  router,
  user
});

export default rootReducer;
