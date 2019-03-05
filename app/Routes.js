import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from 'constants/Routes';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import CounterPage from 'containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={LoginPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
    <Redirect to={routes.LOGIN} />
  </App>
);
