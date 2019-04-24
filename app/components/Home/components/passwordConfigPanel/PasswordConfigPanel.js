// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';
import R from 'ramda';

import Drawer from '@material-ui/core/Drawer';

import PanelHeader from './PanelHeader';
import PasswordFormContent from './configContent/PasswordFormContent';
import PasswordGeneratorContent from './configContent/PasswordGeneratorContent';

import Password from 'constants/records/Password';
import * as passwordKeys from 'constants/records/Password';

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

    const { password } = this.props;

    this.state = {
      stagedPassword: password || new Password()
    };
  }

  // componentDidUpdate() {
  //   console.log('stagedPassword: ', this.state.stagedPassword.toJS());
  // }

  handleStagedPasswordUpdate = key => event => {
    const value = R.path(['target', 'value'])(event);
    this.setState(({ stagedPassword }) => ({
      stagedPassword: stagedPassword.set(key, value)
    }));
  };

  handleStagedPasswordLengthUpdate = (_, value: number) => {
    this.setState(({ stagedPassword }) => ({
      stagedPassword: stagedPassword.set(
        passwordKeys.PASSWORD_LENGTH,
        Math.round(value)
      )
    }));
  };

  handleStagedPasswordBoolToggleUpdate = key => _ => {
    const value = !this.state.stagedPassword.get(key);
    this.setState(({ stagedPassword }) => ({
      stagedPassword: stagedPassword.set(key, value)
    }));
  };

  handleSave() {
    /**
     * TODO:
     * I. check to see if group exsists, if true merge into exsisting
     * password group if false create a new group and add to password list
     *
     * II. after updating Crypt object, dispatch action to encrypt the current
     * Crypt to crypt.dat (later try more resiliant soln i.e. writing to a
     * temporary file and on success copy the contents to real file and delete
     * temporary one)
     *
     */
  }

  render() {
    const { panelOpen, onHandleTogglePanel, content } = this.props;
    const { stagedPassword } = this.state;

    return (
      <Drawer anchor="right" open={panelOpen} onClose={onHandleTogglePanel}>
        <DrawerContainer
        // tabIndex={0}
        // role="button"
        // onClick={this.toggleDrawer('right', false)}
        // onKeyDown={this.toggleDrawer('right', false)}
        >
          <PanelHeaderContainer>
            <PanelHeader onHandleTogglePanel={onHandleTogglePanel} />
          </PanelHeaderContainer>

          <PanelContentContainer>
            {/* <PasswordFormContent
              stagedPassword={stagedPassword}
              onHandleStagedPasswordUpdate={this.handleStagedPasswordUpdate}
            /> */}
            <PasswordGeneratorContent
              stagedPassword={stagedPassword}
              onHandleStagedPasswordBoolToggleUpdate={
                this.handleStagedPasswordBoolToggleUpdate
              }
              onHandleStagedPasswordLengthUpdate={
                this.handleStagedPasswordLengthUpdate
              }
            />
            {/* <Switch>
              <Route
                exact
                path={routes.PASSWORD_FORM}
                render={() => <PasswordFormContent />}
              />
              <Route
                exact
                path={routes.PASSWORD_GENERATOR}
                render={() => <PasswordGeneratorContent />}
              />
              <Redirect to={routes.PASSWORD_FORM} push />
            </Switch> */}
          </PanelContentContainer>
        </DrawerContainer>
      </Drawer>
    );
  }
}

export default PasswordConfigPanel;
