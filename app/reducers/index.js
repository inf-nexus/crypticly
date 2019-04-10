// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import login from 'reducers/login';
// import home from 'reducers/home';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    login
    // home,
  });
}
