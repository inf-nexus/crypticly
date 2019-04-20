// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UILoginPage from 'components/Login/UILoginPage';

import * as loginActions from 'actions/login';
import * as loginSelectors from 'selectors/login';
import * as statusStates from 'constants/statusStates.js';

type Props = {
  loginAttempt: any => any
};

type State = {
  authenticated: boolean
};

class LoginPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
  }

  handleUserAuthentication(username: string, password: string) {
    const { loginAttempt } = this.props;
    loginAttempt(username, password);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <UILoginPage
        authenticated={authenticated}
        onLoginClicked={this.handleUserAuthentication}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    authenticated: loginSelectors.getLoginStatus(state) === statusStates.SUCCESS
  }),
  {
    loginAttempt: loginActions.loginAttempt
  }
)(LoginPage);
