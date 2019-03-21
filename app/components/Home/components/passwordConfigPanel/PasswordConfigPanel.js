// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';

import PasswordFormContent from './configContent/PasswordFormContent';

type Props = {
  open: boolean,
  content: Node,
  onClose: () => void
};

class PasswordConfigPanel extends PureComponent<Props> {
  render() {
    console.log('rendering config panel');
    const { open, onClose, content } = this.props;
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div
        // tabIndex={0}
        // role="button"
        // onClick={this.toggleDrawer('right', false)}
        // onKeyDown={this.toggleDrawer('right', false)}
        >
          <PasswordFormContent />
        </div>
      </Drawer>
    );
  }
}

export default PasswordConfigPanel;
