// @flow

import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { partial } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UIFormInput from 'ui-components/UIFormInput';
import UIButton from 'ui-components/UIButton';

import routes from 'constants/routes';

const TITLE = 'Crypticly';
const USERNAME = 'username';
const PASSWORD = 'password';

const UILoginPageContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
`;

const LoginContainer = styled(Paper)`
  margin: auto;
  width: 500px;
  height: 300px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 3;
`;

const Header = styled(Typography)`
  flex: 1;
`;

type Props = {
  onLoginClicked?: (username: string, password: string) => void
};

type State = {
  username: string,
  password: string,
  authenticated: boolean
};

class LoginForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      authenticated: false
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
  }

  handleInputUpdate(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleUserAuthentication() {
    // TODO: password checking here
    this.setState({ authenticated: true });
  }

  render() {
    const { username, password, authenticated } = this.state;

    let content;

    if (authenticated) {
      content = <Redirect to={routes.HOME} />;
    } else {
      content = (
        <UILoginPageContainer>
          <LoginContainer>
            <Header align="center" variant="h3">
              {TITLE}
            </Header>
            <LoginFormContainer>
              <UIFormInput
                label={USERNAME}
                value={username}
                onChange={partial(this.handleInputUpdate, 'username')}
              />
              <UIFormInput
                label={PASSWORD}
                value={password}
                onChange={partial(this.handleInputUpdate, 'password')}
                type="password"
              />
              <UIButton
                title="Submit"
                onClick={this.handleUserAuthentication}
              />
            </LoginFormContainer>
          </LoginContainer>
        </UILoginPageContainer>
      );
    }

    return content;
  }
}

export default LoginForm;
