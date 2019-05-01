// @flow

import { Record, Map } from 'immutable';
import Password from './Password';
import Credentials from './Credentials';
import PasswordGroup, * as passwordGroupKeys from './PasswordGroup';

export const CREDENTIALS = 'credentials';
export const PASSWORD_GROUPS = 'passwordGroups';

class Crypt extends Record(
  { [CREDENTIALS]: new Credentials(), [PASSWORD_GROUPS]: new Map() },
  'Crypt'
) {
  constructor(props) {
    const propMap = new Map(props);

    const credentials = new Credentials(propMap.get(CREDENTIALS));

    let passwordGroups = new Map(
      Object.keys(propMap.get(PASSWORD_GROUPS) || {}).reduce(
        (groupMap, groupName) => {
          groupMap[groupName] = new PasswordGroup(
            (propMap.get(PASSWORD_GROUPS) || {})[groupName]
          );
          return groupMap;
        },
        {}
      )
    );

    const modifiedPropMap = propMap.merge(
      Map({
        [CREDENTIALS]: credentials,
        [PASSWORD_GROUPS]: passwordGroups
      })
    );

    super(modifiedPropMap);
  }

  getPasswordGroups() {
    return this[PASSWORD_GROUPS];
  }

  getCredentials() {
    return this[CREDENTIALS];
  }

  updateCryptPassword(password: Password) {
    const groupName = password.getGroup();
    const passwordGroups = this.getPasswordGroups();
    let updatedPasswordGroups;
    if (passwordGroups.has(groupName)) {
      const updatedPasswordGroup = passwordGroups
        .get(groupName)
        .updatePassword(password);
      updatedPasswordGroups = passwordGroups.set(
        groupName,
        updatedPasswordGroup
      );
    } else {
      const passwordGroup = new PasswordGroup({
        [passwordGroupKeys.GROUP_NAME]: groupName
      }).updatePassword(password);
      updatedPasswordGroups = passwordGroups.set(groupName, passwordGroup);
    }
    return this.set([PASSWORD_GROUPS], updatedPasswordGroups);
  }
}

export default Crypt;
