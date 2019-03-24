// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import MUIGridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import lockImg from 'img-assets/lock.png';

const GridListTile = styled(MUIGridListTile)`
  padding: 20px;
`;

const Img = styled.img``;

type Props = {
  password: Object
};

class PasswordTile extends PureComponent {
  render() {
    const { password } = this.props;
    return (
      <GridListTile cols={1} key={password.title}>
        <Img src={lockImg} />
        <GridListTileBar
          title={password.title}
          //   subtitle={<span>by: {password.author}</span>}
          //   actionIcon={
          //     <IconButton className={classes.icon}>
          //       <InfoIcon />
          //     </IconButton>
          //   }
        />
      </GridListTile>
    );
  }
}

export default PasswordTile;
