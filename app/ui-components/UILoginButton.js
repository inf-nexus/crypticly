// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MUIButton from '@material-ui/core/Button';

type Props = {
  onClick: () => void,
  title: string
};

const Button = styled(MUIButton)`
  border-radius: 20px;
`;

class UILoginButton extends PureComponent<Props> {
  render() {
    const { onClick, title } = this.props;
    return (
      <Button variant="contained" color="primary" onClick={onClick}>
        {title}
      </Button>
    );
  }
}

export default UILoginButton;
