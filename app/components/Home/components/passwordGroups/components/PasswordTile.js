// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import MUIGridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MUIEditIcon from '@material-ui/icons/Edit';
import lockImg from 'img-assets/lock.png';

const GridListTile = styled(MUIGridListTile)`
  padding: 20px;
`;

const Img = styled.img``;

const EditIcon = styled(MUIEditIcon)`
  color: white;
`;

type Props = {
  password: Object
};

class PasswordTile extends PureComponent {
  render() {
    const { password } = this.props;
    return (
      <GridListTile
        cols={1}
        onClick={() => {
          console.log('grid list tile clicked');
        }}
      >
        <Img src={lockImg} />
        <GridListTileBar
          title={password.getName()}
          actionIcon={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
        />
      </GridListTile>
    );
  }
}

export default PasswordTile;
