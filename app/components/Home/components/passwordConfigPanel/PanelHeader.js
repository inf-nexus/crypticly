// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import MUIPaper from '@material-ui/core/Paper';
import MUIIconButton from '@material-ui/core/IconButton';
import MUIClearIcon from '@material-ui/icons/Clear';

const Paper = styled(MUIPaper)`
  border-radius: 0;
  height: 100%;
  background-color: #232c39;
  background-image: linear-gradient(
    45deg,
    rgba(0, 216, 255, 0.5) 10%,
    rgba(0, 1, 127, 0.7)
  );
  display: flex;
`;

const PanelHeaderContentContainer = styled.div`
  flex: 9;
`;

const IconButton = styled(MUIIconButton)`
  flex: 1;
  :hover {
    background-color: none;
  }
`;

const ClearIcon = styled(MUIClearIcon)`
  color: white;
`;

type Props = {
  onHandleTogglePanel: () => void
};

type State = {};

class PanelHeader extends PureComponent<Props, State> {
  render() {
    const { onHandleTogglePanel, history } = this.props;
    return (
      <Paper>
        <PanelHeaderContentContainer />
        <IconButton disableRipple={true} onClick={onHandleTogglePanel}>
          <ClearIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withRouter(PanelHeader);
