// @flow
import React, { PureComponent } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

type Props = {
  onClick: () => void
};

class AddButton extends PureComponent<Props> {
  render() {
    const { onClick } = this.props;
    return (
      <Fab color="primary" aria-label="Add" onClick={onClick}>
        <AddIcon />
      </Fab>
    );
  }
}

export default AddButton;
