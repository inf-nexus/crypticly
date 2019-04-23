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
  align-self: center;
`;

const PasswordViewer = styled(Typography)`
  align-self: center;
  text-align: center;
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
        uppercase: true
      },
      manualEntry: false
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

  handleToggleManualEntry = () => {
    this.setState(({ manualEntry }) => ({ manualEntry: !manualEntry }));
  };

  render() {
    const {
      sliderValue,
      enabled: { letters, numbers, specialCharacters, uppercase, manualEntry }
    } = this.state;
    console.log('rendering password generator content');
    return (
      <PasswordGeneratorContentContainer>
        <PasswordViewer>{PASSWORD}</PasswordViewer>
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
                  color="primary"
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
                  color="primary"
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
                  color="primary"
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
                  color="primary"
                />
              }
              label="Uppercase"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={manualEntry}
                  onChange={this.handleToggleManualEntry}
                  value={MANUAL_ENTRY}
                  color="primary"
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
