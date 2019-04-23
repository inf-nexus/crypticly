import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';

import routes from 'constants/routes';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';

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
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
      <Redirect to={routes.HOME} />
    </StyledContainer>
  </App>
);
