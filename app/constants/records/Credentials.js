// @flow

import { Record } from 'immutable';

class Credentials extends Record(
  { username: null, password: null },
  'Credentials'
) {
  constructor(props: any) {
    super(props);
  }

  getUsername(): string {
    return this[username];
  }

  getPassword(): string {
    return this[password];
  }
}

export default Credentials;
