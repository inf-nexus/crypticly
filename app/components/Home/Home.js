// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import styled from 'styled-components';

import AddButton from './components/AddButton';
import PasswordConfigPanel from './components/passwordConfigPanel/PasswordConfigPanel';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PasswordsContainer = styled.div`
  flex: 5;
`;
const AddButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const AddButtonStyleWrapper = styled.div`
  margin-top: 80vh;
  position: absolute;
  padding-right: 30px;
`;

type Props = {};

type State = {
  panelOpen: boolean
};

export default class Home extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: false
    };

    this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    this.handlePanelClosed = this.handlePanelClosed.bind(this);
  }

  handleAddButtonClicked() {
    this.setState({ panelOpen: true });
  }

  handlePanelClosed() {
    this.setState({ panelOpen: false });
  }

  render() {
    const { panelOpen } = this.state;
    console.log('panelOpen: ', panelOpen);

    return (
      <HomeContainer>
        <PasswordsContainer />
        <AddButtonContainer>
          <AddButtonStyleWrapper>
            <AddButton onClick={this.handleAddButtonClicked} />
          </AddButtonStyleWrapper>
        </AddButtonContainer>
        <PasswordConfigPanel
          open={panelOpen}
          onClose={this.handlePanelClosed}
        />
      </HomeContainer>
    );
  }
}
