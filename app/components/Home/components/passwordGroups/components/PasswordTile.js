// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { withRouter, Route } from 'react-router';
import styled from 'styled-components';

import MUIGridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MUIEditIcon from '@material-ui/icons/Edit';
import lockImg from 'img-assets/lock.png';

import routes from 'constants/routes';
import * as loginSelectors from 'selectors/login';

import Password from 'constants/records/Password';

const GridListTile = styled(MUIGridListTile)`
  padding: 20px;
`;

const Img = styled.img``;

const EditIcon = styled(MUIEditIcon)`
  color: white;
`;

type Props = {
  password: Password,
  history: Object,
  onHandleTogglePanel: (password: Password) => void
};

class PasswordTile extends PureComponent {
  render() {
    const { password, onHandleTogglePanel } = this.props;
    return (
      <GridListTile cols={1} onClick={onHandleTogglePanel(password)}>
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

export default withRouter(PasswordTile);
