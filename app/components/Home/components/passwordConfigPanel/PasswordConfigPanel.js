// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';

import PanelHeader from './PanelHeader';
import PasswordFormContent from './configContent/PasswordFormContent';

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
  width: 400px;
  padding: 20px;
`;

type Props = {
  panelOpen: boolean,
  content: Node,
  onHandleTogglePanel: () => void
};

type State = {
  panelOpen: boolean
};

class PasswordConfigPanel extends PureComponent<Props, State> {
  render() {
    const { panelOpen, onHandleTogglePanel, content } = this.props;
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
            <PasswordFormContent />
          </PanelContentContainer>
        </DrawerContainer>
      </Drawer>
    );
  }
}

export default PasswordConfigPanel;
