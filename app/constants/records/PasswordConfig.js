// @flow

import { Record } from 'immutable';

const DEFAULT_PASSWORD_LENGTH = 15;

export const PasswordConfigKeys = {
  PASSWORD_LENGTH: 'PASSWORD_LENGTH',
  ALLOW_LETTERS: 'ALLOW_LETTERS',
  ALLOW_NUMS: 'ALLOW_NUMS',
  ALLOW_SPECIAL_CHARS: 'ALLOW_SPECIAL_CHARS',
  ALLOW_UPPERCASE: 'ALLOW_UPPERCASE'
};

class PasswordConfig extends Record(
  {
    [PasswordConfigKeys.PASSWORD_LENGTH]: DEFAULT_PASSWORD_LENGTH,
    [PasswordConfigKeys.ALLOW_LETTERS]: true,
    [PasswordConfigKeys.ALLOW_NUMS]: true,
    [PasswordConfigKeys.ALLOW_SPECIAL_CHARS]: true,
    [PasswordConfigKeys.ALLOW_UPPERCASE]: true
  },
  'PasswordConfig'
) {}

export default PasswordConfig;
