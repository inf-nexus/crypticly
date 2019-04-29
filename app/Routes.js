import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';

import routes from 'constants/routes';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';

import Paper from '@material-ui/core/Paper';

const StyledContainer = styled(Paper)`
  /* background-color: #232c39;
  background-image: linear-gradient(
    45deg,
    rgba(0, 216, 255, 0.5) 10%,
    rgba(0, 1, 127, 0.7)
  ); */
  background-color: ${props => props.theme.main.colors.primary};
  min-height: 100vh;
`;

const DraggableRegion = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 30px;
  -webkit-app-region: drag;
  background-color: ${props => props.theme.main.colors.secondary};
`;

const ScrollContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    background-color: ${props => props.theme.main.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: ${props => props.theme.main.colors.secondary};
  }

  min-height: 100vh;
  height: 100vh;
`;

export default () => (
  <App>
    <StyledContainer>
      <DraggableRegion />
      <ScrollContainer>
        <Switch>
          <Route path={routes.LOGIN} component={LoginPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
        <Redirect to={routes.LOGIN} />
      </ScrollContainer>
    </StyledContainer>
  </App>
);
