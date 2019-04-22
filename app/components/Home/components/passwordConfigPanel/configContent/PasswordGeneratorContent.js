// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MUISlider from '@material-ui/lab/Slider';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import UIButton from 'ui-components/UIButton';

const PasswordGeneratorContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const Slider = styled(MUISlider)`
  width: 300px;
`;

const PASSWORD = 'Hello World Cool Password';

const LETTERS = 'letters';
const NUMBERS = 'numbers';
const SPECIAL_CHARACTERS = 'specialCharacters';
const UPPERCASE = 'uppercase';
const MANUAL_ENTRY = 'manualEntry';

const SAVE = 'Save';

type Props = {};

type State = {
  sliderValue: number,
  enabled: object
};

class PasswordGeneratorContent extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      enabled: {
        letters: true,
        numbers: true,
        specialCharacters: true,
        uppercase: true,
        manualEntry: false
      }
    };
  }

  handleSliderChange = (event, value: number) => {
    this.setState({ sliderValue: value });
  };

  handleToggleEnabledValue = value => event => {
    this.setState(({ enabled }) => ({
      enabled: { ...enabled, [value]: !enabled[value] }
    }));
  };

  render() {
    const {
      sliderValue,
      enabled: { letters, numbers, specialCharacters, uppercase, manualEntry }
    } = this.state;
    return (
      <PasswordGeneratorContentContainer>
        <Typography textAlign="center">{PASSWORD}</Typography>
        <Slider value={sliderValue} onChange={this.handleSliderChange} />
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={letters}
                  onChange={this.handleToggleEnabledValue(LETTERS)}
                  value={LETTERS}
                />
              }
              label="Letters"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={numbers}
                  onChange={this.handleToggleEnabledValue(NUMBERS)}
                  value={NUMBERS}
                />
              }
              label="Numbers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={specialCharacters}
                  onChange={this.handleToggleEnabledValue(SPECIAL_CHARACTERS)}
                  value={SPECIAL_CHARACTERS}
                />
              }
              label="Special Characters"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={uppercase}
                  onChange={this.handleToggleEnabledValue(UPPERCASE)}
                  value={UPPERCASE}
                />
              }
              label="Uppercase"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={manualEntry}
                  onChange={this.handleToggleEnabledValue(MANUAL_ENTRY)}
                  value={MANUAL_ENTRY}
                />
              }
              label="Manual Entry"
            />
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
        <UIButton
          title={SAVE}
          // onClick={partial(onLoginClicked, username, password)}
        />
      </PasswordGeneratorContentContainer>
    );
  }
}

export default PasswordGeneratorContent;
