// @flow

import { Record, List, Map } from 'immutable';
import Password from './Password';

// PasswordGroupKeys
export const GROUP_NAME = 'groupName';
export const PASSWORDS = 'passwords';

class PasswordGroup extends Record(
  {
    groupName: '',
    passwords: new Map()
  },
  'PasswordGroup'
) {
  constructor(props) {
    const propMap = Map(props);

    const passwords = new Map(
      Object.keys(propMap.get(PASSWORDS) || {}).reduce(
        (passwordMap, passwordName) => {
          passwordMap[passwordName] = new Password(
            (propMap.get(PASSWORDS) || {})[passwordName]
          );
          return passwordMap;
        },
        {}
      )
    );

    const modifiedPropMap = propMap.merge(Map({ [PASSWORDS]: passwords }));

    super(modifiedPropMap);
  }

  getGroupName() {
    return this[GROUP_NAME];
  }

  getPasswords() {
    return this[PASSWORDS];
  }

  updatePassword(password: Password) {
    const passwordName = password.getName();
    const passwords = this.getPasswords();
    return this.set(PASSWORDS, passwords.set(passwordName, password));
  }
}

export default PasswordGroup;
