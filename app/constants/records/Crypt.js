// @flow

import { Record, List, Map } from 'immutable';
import Password from './Password';
import Credentials from './Credentials';

export const CREDENTIALS = 'credentials';
export const PASSWORDS = 'passwords';

class Crypt extends Record(
  { [CREDENTIALS]: null, [PASSWORDS]: null },
  'Crypt'
) {
  constructor(props) {
    const propMap = new Map(props);

    const credentials = new Credentials(propMap.get(CREDENTIALS));
    const passwords = new List(
      (propMap.get(PASSWORDS) || []).map(password => new Password(password))
    );

    const modifiedPropMap = propMap.merge({
      [CREDENTIALS]: credentials,
      [PASSWORDS]: passwords
    });

    super(modifiedPropMap);
  }

  getPasswords() {
    return this.PASSWORDS;
  }

  getCredentials() {
    return this.CREDENTIALS;
  }
}

export default Crypt;
