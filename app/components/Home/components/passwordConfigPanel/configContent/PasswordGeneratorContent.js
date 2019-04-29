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

import * as passwordKeys from 'constants/records/Password';

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

const PASSWORD = 'zq5OhiA9icg14tyR';
const MIN_PASSWORD_LENGTH = 1;
const MAX_PASSWORD_LENGTH = 40;

const SAVE = 'Save';

type Props = {
  stagedPassword: any,
  onHandleStagedPasswordLengthUpdate: (event: any, value: number) => void,
  onHandleStagedPasswordBoolToggleUpdate: (key: string) => (event: any) => void
};

type State = {};

class PasswordGeneratorContent extends PureComponent<Props, State> {
  render() {
    const {
      onHandleStagedPasswordLengthUpdate,
      onHandleStagedPasswordBoolToggleUpdate,
      stagedPassword
    } = this.props;

    const passwordLength = stagedPassword.getPasswordLength();
    const lettersEnabled = stagedPassword.getLettersEnabled();
    const numsEnabled = stagedPassword.getNumsEnabled();
    const specialCharactersEnabled = stagedPassword.getSpecialCharsEnabled();
    const uppercaseEnabled = stagedPassword.getUppercaseEnabled();
    const manualEntryEnabled = stagedPassword.getManualEntryEnabled();

    console.log('passwordLength: ', passwordLength);

    return (
      <PasswordGeneratorContentContainer>
        <PasswordViewer>{PASSWORD}</PasswordViewer>
        <Slider
          value={passwordLength}
          onChange={onHandleStagedPasswordLengthUpdate}
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
        />
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={lettersEnabled}
                  onChange={onHandleStagedPasswordBoolToggleUpdate(
                    passwordKeys.LETTERS_ENABLED
                  )}
                  value={passwordKeys.LETTERS_ENABLED}
                  color="primary"
                />
              }
              label="Letters"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={numsEnabled}
                  onChange={onHandleStagedPasswordBoolToggleUpdate(
                    passwordKeys.NUMS_ENABLED
                  )}
                  value={passwordKeys.NUMS_ENABLED}
                  color="primary"
                />
              }
              label="Numbers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={specialCharactersEnabled}
                  onChange={onHandleStagedPasswordBoolToggleUpdate(
                    passwordKeys.SPECIAL_CHARS_ENABLED
                  )}
                  value={passwordKeys.SPECIAL_CHARS_ENABLED}
                  color="primary"
                />
              }
              label="Special Characters"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={uppercaseEnabled}
                  onChange={onHandleStagedPasswordBoolToggleUpdate(
                    passwordKeys.UPPERCASE_ENABLED
                  )}
                  value={passwordKeys.UPPERCASE_ENABLED}
                  color="primary"
                />
              }
              label="Uppercase"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={manualEntryEnabled}
                  onChange={onHandleStagedPasswordBoolToggleUpdate(
                    passwordKeys.MANUAL_ENTRY_ENABLED
                  )}
                  value={passwordKeys.MANUAL_ENTRY_ENABLED}
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
