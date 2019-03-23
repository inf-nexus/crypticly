// @flow

import { Record } from 'immutable';

class Credentials extends Record(
  { username: null, password: null },
  'Credentials'
) {
  getUsername() {
    return this[username];
  }

  getPassword() {
    return this[password];
  }
}

export default Credentials;
