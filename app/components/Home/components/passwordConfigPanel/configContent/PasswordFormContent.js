// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import UIFormInput from 'ui-components/UIFormInput';
import UIButton from 'ui-components/UIButton';

import * as passwordKeys from 'constants/records/Password';

import routes from 'constants/routes';

const NAME = 'Name';
const URL = 'URL';
const USER_NAME = 'Username';
const GROUP = 'Group';
const GENERATE_PASSWORD = 'Generate Password';

const PasswordFormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

type Props = {
  stagedPassword: any,
  onHandleStagedPasswordUpdate: (recordKey: string, recordVal: any) => void
};

type State = {};

class PasswordFormContent extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  handleGeneratePasswordClicked = () => {
    const { history } = this.props;
    const { valid } = this.state;
    if (valid) {
      history.replace(routes.PASSWORD_GENERATOR);
    }
  };

  render() {
    const {
      stagedPasswordGroupName,
      stagedPassword,
      onHandleStagedPasswordGroupNameUpdate,
      onHandleStagedPasswordUpdate
    } = this.props;
    const { valid } = this.state;

    const name = stagedPassword.getName();
    const url = stagedPassword.getUrl();
    const username = stagedPassword.getUsername();
    const group = stagedPassword.getGroup();

    return (
      <PasswordFormContentContainer>
        <UIFormInput
          label={NAME}
          value={name}
          // onChange={partial(this.handleInputUpdate, 'username')}
        />
        <UIFormInput
          label={URL}
          value={url}
          // onChange={partial(this.handleInputUpdate, 'password')}
        />
        <UIFormInput
          label={USER_NAME}
          value={username}
          // onChange={partial(this.handleInputUpdate, 'password')}
        />
        <UIFormInput
          label={GROUP}
          value={group}
          // onChange={partial(this.handleInputUpdate, 'password')}
        />
        <UIButton
          title={GENERATE_PASSWORD}
          // onClick={this.handleGeneratePasswordClicked}
        />
      </PasswordFormContentContainer>
    );
  }
}

export default withRouter(PasswordFormContent);
