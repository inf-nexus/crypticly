// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UILoginPage from 'components/Login/UILoginPage';

import * as loginActions from 'actions/login';

type Props = {
  loginAttempt: any => any
};

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
    const { loginAttempt } = this.props;
    loginAttempt(username, password);
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

export default connect(
  (state, ownProps) => ({}),
  {
    loginAttempt: loginActions.loginAttempt
  }
)(LoginPage);
