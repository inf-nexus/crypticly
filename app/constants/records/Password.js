// @flow

import { Record, Map } from 'immutable';

import PasswordConfig, { PasswordConfigKeys } from './PasswordConfig';

// PasswordKeys
export const USERNAME = 'username';
export const PASSWORD = 'password';
export const NAME = 'name';
export const URL = 'url';
export const LAST_UPDATED = 'lastUpdated';
export const GROUP = 'group';
export const CONFIG = 'config';

class Password extends Record(
  {
    [USERNAME]: null,
    [PASSWORD]: null,
    [NAME]: null,
    [URL]: null,
    [LAST_UPDATED]: null,
    [GROUP]: null,
    [CONFIG]: null
  },
  'Password'
) {
  constructor(props) {
    const propMap = new Map(props);

    const config = new PasswordConfig(propMap.get(CONFIG));
    const modifiedPropMap = propMap.merge({ [CONFIG]: config });

    super(modifiedPropMap);
  }

  getUsername() {
    return this.USERNAME;
  }

  getPassword() {
    return this.PASSWORD;
  }
}

export default Password;
