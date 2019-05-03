// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import styled from 'styled-components';

import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MUIExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUITypography from '@material-ui/core/Typography';

import * as loginSelectors from 'selectors/login';

import PasswordGroup from './components/PasswordGroup';

import Password from 'constants/records/Password';

const ExpansionPanel = styled(MUIExpansionPanel)`
  background: none;
  box-shadow: none;
  margin-bottom: 100px;
  min-width: 700px;

  :before {
    background: none;
  }

  && {
    border-bottom: 1px solid ${props => props.theme.text.colors.primary};
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-auto;
  }
`;

const Typography = styled(MUITypography)`
  color: ${props => props.theme.text.colors.primary};
`;

const ExpandMoreIcon = styled(MUIExpandMoreIcon)`
  color: ${props => props.theme.text.colors.primary};
`;

const PasswordExpansionPanel = ({ passwordGroup, onHandleTogglePanel }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography component="h2">{passwordGroup.getGroupName()}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <PasswordGroup
        passwords={passwordGroup.getPasswords()}
        onHandleTogglePanel={onHandleTogglePanel}
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

type Props = {
  passwordGroups: List<PasswordGroup>,
  onHandleTogglePanel: (password: Password) => void
};

class PasswordGroups extends PureComponent<Props> {
  render() {
    const { passwordGroups, onHandleTogglePanel } = this.props;

    return (
      <div>
        {passwordGroups.keySeq().map(passwordGroupName => {
          const passwordGroup: PasswordGroup = passwordGroups.get(
            passwordGroupName
          );
          return (
            <PasswordExpansionPanel
              passwordGroup={passwordGroup}
              key={passwordGroup.getGroupName()}
              onHandleTogglePanel={onHandleTogglePanel}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    passwordGroups: loginSelectors.getPasswordGroups(state)
  }),
  {}
)(PasswordGroups);
