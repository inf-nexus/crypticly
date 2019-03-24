// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MUIExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUITypography from '@material-ui/core/Typography';

import PasswordGroup from './components/PasswordGroup';

import { passwordGroups } from 'constants/testingConstants';

const ExpansionPanel = styled(MUIExpansionPanel)`
  background: none;
  box-shadow: none;
  margin-bottom: 100px;

  :before {
    background: none;
  }

  && {
    border-bottom: 1px solid white;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-auto;
  }
`;

const Typography = styled(MUITypography)`
  color: white;
`;

const ExpandMoreIcon = styled(MUIExpandMoreIcon)`
  color: white;
`;

const PasswordExpansionPanel = ({ passwordGroup }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography component="h2">{passwordGroup.group}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <PasswordGroup passwords={passwordGroup.passwords} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

type Props = {};

class PasswordGroups extends PureComponent<Props> {
  render() {
    return (
      <div>
        {passwordGroups.map(passwordGroup => (
          <PasswordExpansionPanel passwordGroup={passwordGroup} />
        ))}
      </div>
    );
  }
}

export default PasswordGroups;
