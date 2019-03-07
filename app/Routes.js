import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from 'constants/Routes';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import CounterPage from 'containers/CounterPage';

import styled from 'styled-components';

const DraggableRegion = styled.div`
  height: 50px;
  width: 100%;
  -webkit-app-region: drag;
`;

export default () => (
  <App>
    <DraggableRegion />
    <Switch>
      <Route path={routes.LOGIN} component={LoginPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
    {/* <Redirect to={routes.LOGIN} /> */}
  </App>
);
