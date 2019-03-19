// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { partial } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UIFormInput from 'ui-components/UIFormInput';
import UIButton from 'ui-components/UIButton';

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
    return (
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
              onClick={() => {
                console.log('button clicked');
              }}
            />
          </LoginFormContainer>
        </LoginContainer>
      </UILoginPageContainer>
    );
  }
}

export default LoginForm;
