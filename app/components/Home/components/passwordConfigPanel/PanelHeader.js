// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import MUIPaper from '@material-ui/core/Paper';
import MUIIconButton from '@material-ui/core/IconButton';
import MUIClearIcon from '@material-ui/icons/Clear';
import MUIKeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Typography from '@material-ui/core/Typography';

import routes from 'constants/routes';

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

// const PanelHeaderContentContainer = styled.div`
//   flex: 8;
// `;

const IconButton = styled(MUIIconButton)`
  flex: 1;
`;

const ClearIcon = styled(MUIClearIcon)`
  color: white;
`;

const KeyboardArrowLeftIcon = styled(MUIKeyboardArrowLeftIcon)`
  color: white;
`;

const PasswordTitleWrapper = styled(Typography)`
  color: white;
  flex: 8;
  align-self: center;
  text-align: center;
`;

type Props = {
  onHandleTogglePanel: () => void,
  passwordTitle: string,
  history: object,
  location: object
};

type State = {};

class PanelHeader extends PureComponent<Props, State> {
  handleBackButtonClicked = () => {
    const { history } = this.props;
    history.push(routes.PASSWORD_FORM);
  };

  render() {
    const {
      onHandleTogglePanel,
      history,
      location: { pathname },
      passwordTitle
    } = this.props;
    return (
      <Paper>
        {pathname === routes.PASSWORD_GENERATOR && (
          <IconButton onClick={this.handleBackButtonClicked}>
            <KeyboardArrowLeftIcon />
          </IconButton>
        )}
        <PasswordTitleWrapper>
          {pathname === routes.PASSWORD_GENERATOR && passwordTitle}
        </PasswordTitleWrapper>
        <IconButton onClick={onHandleTogglePanel}>
          <ClearIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withRouter(PanelHeader);
