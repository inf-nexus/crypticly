// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import styled from 'styled-components';

import AddButton from './components/AddButton';
import PasswordGroups from './components/passwordGroups/PasswordGroups';
import PasswordConfigPanel from './components/passwordConfigPanel/PasswordConfigPanel';

// TODO: remove import after testing
// import { encryptToFile, decryptFromFile } from 'utils/cipher';
// import { getDerivedKeyFromPassword } from 'utils/keyGen';
import CryptManager from 'utils/CryptManager';

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

// TODO: for testing remove after
const cryptManagerTest = async () => {
  const password = 'helloWorld!';
  const cryptManager = new CryptManager();

  const initSuccess = await cryptManager.initCrypt(password);
  console.log('initSuccess: ', initSuccess);
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
    // this.setState({ panelOpen: true });
    cryptManagerTest();
  }

  handlePanelClosed() {
    this.setState({ panelOpen: false });
  }

  render() {
    const { panelOpen } = this.state;
    console.log('panelOpen: ', panelOpen);

    return (
      <HomeContainer>
        <PasswordsContainer>
          <PasswordGroups />
        </PasswordsContainer>
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
