// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import UIFormInput from 'ui-components/UIFormInput';
import UIButton from 'ui-components/UIButton';

const NAME = 'Name';
const URL = 'URL';
const USER_NAME = 'Username';
const GENERATE_PASSWORD = 'Generate Password';

const PasswordFormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

type Props = {};

type State = {};

class PasswordFormContent extends PureComponent<Props, State> {
  render() {
    return (
      <PasswordFormContentContainer>
        <UIFormInput
          label={NAME}
          // value={username}
          // onChange={partial(this.handleInputUpdate, 'username')}
        />
        <UIFormInput
          label={URL}
          // value={password}
          // onChange={partial(this.handleInputUpdate, 'password')}
        />
        <UIFormInput
          label={USER_NAME}
          // value={password}
          // onChange={partial(this.handleInputUpdate, 'password')}
        />
        <UIButton
          title={GENERATE_PASSWORD}
          // onClick={partial(onLoginClicked, username, password)}
        />
      </PasswordFormContentContainer>
    );
  }
}

export default PasswordFormContent;
