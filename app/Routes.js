import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';

import Routes from 'constants/Routes';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import CounterPage from 'containers/CounterPage';

import Paper from '@material-ui/core/Paper';

const StyledContainer = styled(Paper)`
  background-color: #232c39;
  background-image: linear-gradient(
    45deg,
    rgba(0, 216, 255, 0.5) 10%,
    rgba(0, 1, 127, 0.7)
  );
  min-height: 100vh;
`;

const DraggableRegion = styled.div`
  height: 50px;
  width: 100%;
  -webkit-app-region: drag;
`;

export default () => (
  <App>
    <StyledContainer>
      <DraggableRegion />
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <Route path={Routes.COUNTER} component={CounterPage} />
        <Route path={Routes.HOME} component={HomePage} />
      </Switch>
      <Redirect to={Routes.HOME} />
    </StyledContainer>
  </App>
);
