// @flow

import { Record } from 'immutable';

import PasswordConfig, { PasswordConfigKeys } from './PasswordConfig';

class Password extends Record(
  {
    username: null,
    password: null,
    name: null,
    url: null,
    lastUpdated: null,
    group: null,
    config: new PasswordConfig()
  },
  'Password'
) {
  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
    this.upadatePasswordConfig(
      PasswordConfigKeys.PASSWORD_LENGTH,
      password.length
    );
  }

  upadatePasswordConfig(key, value) {
    this.config = this.config.set(key, value);
  }
}

export default Password;
