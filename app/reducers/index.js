// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import client from '../client';
import user from './user';
import game from './game';
import category from './category';

const rootReducer = combineReducers({
  apollo: client.reducer(),
  router,
  user,
  game,
  category
});

export default rootReducer;
