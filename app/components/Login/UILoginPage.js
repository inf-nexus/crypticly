// @flow

import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { partial } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UILoginInput from 'ui-components/UILoginInput';
import UILoginButton from 'ui-components/UILoginButton';

import routes from 'constants/routes';
import * as dataTestIds from 'constants/dataTestIds';

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
  background-color: ${props => props.theme.main.colors.secondary};
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 3;
`;

const Header = styled(Typography)`
  flex: 1;
  color: ${props => props.theme.text.colors.primary};
`;

type Props = {
  onLoginClicked: (username: string, password: string) => void,
  authenticated: boolean
};

type State = {
  username: string,
  password: string
};

class LoginForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
  }

  handleInputUpdate(field, event) {
    this.setState({ [field]: event.target.value });
  }

  render() {
    const { username, password } = this.state;
    const { onLoginClicked, authenticated } = this.props;

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
              <UILoginInput
                label={USERNAME}
                value={username}
                onChange={partial(this.handleInputUpdate, 'username')}
                data-test-id={dataTestIds.LOGIN_USERNAME_INPUT_ID}
              />
              <UILoginInput
                label={PASSWORD}
                value={password}
                onChange={partial(this.handleInputUpdate, 'password')}
                type="password"
                data-test-id={dataTestIds.LOGIN_PASSWORD_INPUT_ID}
              />
              <UILoginButton
                title="Submit"
                onClick={partial(onLoginClicked, username, password)}
                data-test-id={dataTestIds.LOGIN_BUTTON_ID}
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
