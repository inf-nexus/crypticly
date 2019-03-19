// @flow

import React, { PureComponent } from 'react';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';

type Props = {
  onClick: () => void,
  title: string
};

class UIButton extends PureComponent<Props> {
  render() {
    const { onClick, title } = this.props;
    return (
      <Button variant="contained" color="primary" onClick={onClick}>
        {title}
      </Button>
    );
  }
}

export default UIButton;
