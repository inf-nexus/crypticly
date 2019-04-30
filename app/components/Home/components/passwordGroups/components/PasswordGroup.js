// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import MUIGridList from '@material-ui/core/GridList';
import PasswordTile from './PasswordTile';

const GridList = styled(MUIGridList)`
  width: auto;
`;

type Props = {
  passwords: List<Object>
};

class PasswordGroup extends PureComponent<Props> {
  render() {
    const { passwords } = this.props;
    return (
      <GridList cols={3} spacing={10} cellHeight="auto">
        {passwords.map(password => (
          <PasswordTile password={password} key={password.getName()} />
        ))}
      </GridList>
    );
  }
}

export default PasswordGroup;
