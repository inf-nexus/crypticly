// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { List } from 'immutable';
import styled from 'styled-components';

import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MUIExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUITypography from '@material-ui/core/Typography';

import PasswordGroup from './components/PasswordGroup';

const ExpansionPanel = styled(MUIExpansionPanel)`
  background: none;
  box-shadow: none;
  margin-bottom: 100px;

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

const PasswordExpansionPanel = ({ passwordGroup }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography component="h2">{passwordGroup.getGroupName()}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <PasswordGroup passwords={passwordGroup.getPasswords()} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

type Props = {
  passwordGroups: List<PasswordGroup>
};

class PasswordGroups extends PureComponent<Props> {
  render() {
    const { passwordGroups = new List() } = this.props;

    return (
      <div>
        {passwordGroups.map(passwordGroup => (
          <PasswordExpansionPanel
            passwordGroup={passwordGroup}
            key={passwordGroup.getGroupName()}
          />
        ))}
      </div>
    );
  }
}

export default PasswordGroups;
