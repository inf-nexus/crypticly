// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import styled from 'styled-components';
import R from 'ramda';

import Drawer from '@material-ui/core/Drawer';

import PanelHeader from './PanelHeader';
import PasswordFormContent from './configContent/PasswordFormContent';
import PasswordGeneratorContent from './configContent/PasswordGeneratorContent';
import { generateRandomPassword } from 'utils/passwordGenerator';

import Password from 'constants/records/Password';
import * as passwordKeys from 'constants/records/Password';
import * as loginActions from 'actions/login';

import routes from 'constants/routes';

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const PanelHeaderContainer = styled.div`
  flex: 1;
`;

const PanelContentContainer = styled.div`
  flex: 9;
  width: 350px;
  padding: 20px;
  overflow-x: hidden;
`;

type Props = {
  panelOpen: boolean,
  content: Node,
  onHandleTogglePanel: () => void
};

type State = {};

class PasswordConfigPanel extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    const { password = new Password() } = this.props;
    const stagedPassword = !password.getPassword()
      ? password.set(passwordKeys.PASSWORD, password.generateRandomPassword())
      : password;

    this.state = {
      stagedPassword
    };
  }

  handleStagedPasswordUpdate = key => event => {
    const value = R.path(['target', 'value'])(event);
    this.setState(({ stagedPassword }) => ({
      stagedPassword: stagedPassword.set(key, value)
    }));
  };

  handleStagedPasswordLengthUpdate = (_, value: number) => {
    const { stagedPassword } = this.state;

    const nextStagedPassword: Password = stagedPassword.set(
      passwordKeys.PASSWORD_LENGTH,
      Math.round(value)
    );

    this.setState(() => ({
      stagedPassword: nextStagedPassword.set(
        passwordKeys.PASSWORD,
        nextStagedPassword.generateRandomPassword()
      )
    }));
  };

  handleStagedPasswordBoolToggleUpdate = key => _ => {
    const value = !this.state.stagedPassword.get(key);
    this.setState(({ stagedPassword }) => ({
      stagedPassword: stagedPassword.set(key, value)
    }));
  };

  handleSave = () => {
    const { onHandleTogglePanel, updateCryptPassword } = this.props;
    const { stagedPassword } = this.state;
    updateCryptPassword(stagedPassword);
    onHandleTogglePanel();
  };

  render() {
    const { panelOpen, onHandleTogglePanel, content, history } = this.props;
    const { stagedPassword } = this.state;

    if (!panelOpen) {
      return null;
    }

    return (
      <Drawer anchor="right" open={panelOpen} onClose={onHandleTogglePanel}>
        <DrawerContainer>
          <PanelHeaderContainer>
            <PanelHeader
              onHandleTogglePanel={onHandleTogglePanel}
              passwordTitle={stagedPassword.getName()}
            />
          </PanelHeaderContainer>

          <PanelContentContainer>
            <Switch>
              <Route
                path={routes.PASSWORD_FORM}
                render={() => (
                  <PasswordFormContent
                    stagedPassword={stagedPassword}
                    onHandleStagedPasswordUpdate={
                      this.handleStagedPasswordUpdate
                    }
                  />
                )}
              />
              <Route
                path={routes.PASSWORD_GENERATOR}
                render={() => (
                  <PasswordGeneratorContent
                    stagedPassword={stagedPassword}
                    onHandleStagedPasswordBoolToggleUpdate={
                      this.handleStagedPasswordBoolToggleUpdate
                    }
                    onHandleStagedPasswordLengthUpdate={
                      this.handleStagedPasswordLengthUpdate
                    }
                    onHandleSave={this.handleSave}
                  />
                )}
              />
              <Redirect to={routes.PASSWORD_FORM} />
            </Switch>
          </PanelContentContainer>
        </DrawerContainer>
      </Drawer>
    );
  }
}

const ConnectedPasswordConfigPanel = connect(
  (state, ownProps) => ({}),
  {
    updateCryptPassword: loginActions.updateCryptPassword
  }
)(PasswordConfigPanel);

export default withRouter(ConnectedPasswordConfigPanel);
