// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import { partial } from 'lodash';

// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  border: 1px solid gray;
  background-color: white;
  padding: 1px;
  border-radius: 20px;
  padding-left: 20px;
  flex: 1;
`;

type Props = {
  label: string,
  placeholder: ?string,
  value: string,
  type: ?string,
  onChange: () => void
};

class UILoginInput extends PureComponent<Props> {
  render() {
    const { label, placeholder, value, onChange, type } = this.props;

    return (
      <InputContainer>
        <StyledInput
          placeholder={label}
          value={value}
          onChange={onChange}
          autoComplete="false"
          disableUnderline
          required
          type={type}
        />
      </InputContainer>
    );
  }
}

export default UILoginInput;
