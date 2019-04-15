// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import crypt from 'reducers/crypt';
// import home from 'reducers/home';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    crypt
    // home,
  });
}
