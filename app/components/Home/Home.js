// @flow
import React, { PureComponent } from 'react';
import { withRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import styled from 'styled-components';

import AddButton from './components/AddButton';
import PasswordGroups from './components/passwordGroups/PasswordGroups';
import PasswordConfigPanel from './components/passwordConfigPanel/PasswordConfigPanel';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PasswordsContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;
const AddButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const AddButtonStyleWrapper = styled.div`
  margin-top: 80vh;
  position: fixed;
  padding-right: 30px;
`;

type Props = {};

type State = {
  panelOpen: boolean
};

class Home extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: false
    };
  }

  handleTogglePanel = () => {
    const { history } = this.props;

    this.setState(
      prevState => ({ panelOpen: !prevState.panelOpen }),
      () => {
        const { panelOpen } = this.state;
        if (panelOpen) {
          history.push(routes.PASSWORD);
        } else {
          history.push(routes.HOME);
        }
      }
    );
  };

  render() {
    const { panelOpen } = this.state;

    return (
      <HomeContainer>
        <PasswordsContainer>
          <PasswordGroups />
        </PasswordsContainer>
        <AddButtonContainer>
          <AddButtonStyleWrapper>
            <AddButton onClick={this.handleTogglePanel} />
          </AddButtonStyleWrapper>
        </AddButtonContainer>
        <Route
          path={routes.PASSWORD}
          render={() => (
            <PasswordConfigPanel
              panelOpen={panelOpen}
              onHandleTogglePanel={this.handleTogglePanel}
            />
          )}
        />
      </HomeContainer>
    );
  }
}

export default withRouter(Home);
