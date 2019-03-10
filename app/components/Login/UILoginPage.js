// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { partial } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FormInput from 'ui-components/FormInput';

const TITLE = 'Crypticly';
const USERNAME = 'username';
const PASSWORD = 'password';

const UILoginPageContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled(Paper)`
  margin: auto;
  width: 500px;
  height: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Header = styled(Typography)`
  flex: 1;
`;

type Props = {
  onLoginClicked: (username: string, password: string) => void
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
    return (
      <UILoginPageContainer>
        <LoginContainer>
          <Header align="center" variant="h3">
            {TITLE}
          </Header>
          <LoginFormContainer>
            <FormInput
              label={USERNAME}
              value={this.state.username}
              onChange={partial(this.handleInputUpdate, 'username')}
            />

            <FormInput
              label={PASSWORD}
              value={this.state.password}
              onChange={partial(this.handleInputUpdate, 'password')}
              type="password"
            />
          </LoginFormContainer>
        </LoginContainer>
      </UILoginPageContainer>
    );
  }
}

export default LoginForm;
