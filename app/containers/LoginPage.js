// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UILoginPage from 'components/Login/UILoginPage';

type Props = {};

type State = {
  authenticated: boolean
};

class LoginPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };

    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
  }

  handleUserAuthentication(username: string, password: string) {
    // TODO: password checking here
    // this.setState({ authenticated: true });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <UILoginPage
        authenticated={authenticated}
        onLoginClicked={this.handleUserAuthentication}
      />
    );
  }
}

export default LoginPage;
