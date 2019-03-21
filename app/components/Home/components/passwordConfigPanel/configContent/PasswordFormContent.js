// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const CoolPlaceHolder = styled.div`
  width: 400px;
  height: 100vh;
`;

class PasswordFormContent extends PureComponent {
  render() {
    return <CoolPlaceHolder />;
  }
}

export default PasswordFormContent;
