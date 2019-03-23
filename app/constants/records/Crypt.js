// @flow

import { Record, List } from 'immutable';
import Password from './Password';
import Credentials from './Credentials';

class Crypt extends Record(
  { credentials: new Credentials(), passwords: new List() },
  'Crypt'
) {
  getPasswords() {
    return this[passwords];
  }

  getCredentials() {
    return this[passwords];
  }
}

export default Crypt;
