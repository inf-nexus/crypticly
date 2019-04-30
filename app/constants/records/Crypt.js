// @flow

import { Record, List, Map } from 'immutable';
import Password from './Password';
import Credentials from './Credentials';
import PasswordGroup from './PasswordGroup';

export const CREDENTIALS = 'credentials';
export const PASSWORD_GROUPS = 'passwordGroups';

class Crypt extends Record(
  { [CREDENTIALS]: new Credentials(), [PASSWORD_GROUPS]: new List() },
  'Crypt'
) {
  constructor(props) {
    const propMap = new Map(props);

    const credentials = new Credentials(propMap.get(CREDENTIALS));
    const passwordGroups = new List(
      (propMap.get(PASSWORD_GROUPS) || []).map(
        passwordGroup => new PasswordGroup(passwordGroup)
      )
    );

    const modifiedPropMap = propMap.merge({
      [CREDENTIALS]: credentials,
      [PASSWORD_GROUPS]: passwordGroups
    });

    super(modifiedPropMap);
  }

  getPasswordGroups() {
    return this[PASSWORD_GROUPS];
  }

  getCredentials() {
    return this[CREDENTIALS];
  }
}

export default Crypt;
