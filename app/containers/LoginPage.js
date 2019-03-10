// @flow

import React, { Component } from 'react';
import UILoginPage from 'components/Login/UILoginPage';

type Props = {};

class LoginPage extends Component<Props> {
  handleLogin(username: string, password: string) {
    console.log('username: ', username, ' password: ', password);
  }

  render() {
    return <UILoginPage onLoginClicked={this.handleLogin} />;
  }
}

export default LoginPage;
