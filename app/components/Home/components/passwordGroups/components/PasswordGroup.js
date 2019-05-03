// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Map } from 'immutable';
import styled from 'styled-components';

import Password from 'constants/records/Password';

import MUIGridList from '@material-ui/core/GridList';
import PasswordTile from './PasswordTile';

const GridList = styled(MUIGridList)`
  width: auto;
`;

type Props = {
  passwords: Map<Password>,
  onHandleTogglePanel: (password: Password) => void
};

class PasswordGroup extends PureComponent<Props> {
  render() {
    const { passwords, onHandleTogglePanel } = this.props;
    return (
      <GridList cols={3} spacing={10} cellHeight="auto">
        {passwords.keySeq().map(passwordName => {
          const password: Password = passwords.get(passwordName);
          return (
            <PasswordTile
              password={password}
              key={password.getName()}
              onHandleTogglePanel={onHandleTogglePanel}
            />
          );
        })}
      </GridList>
    );
  }
}

export default PasswordGroup;
