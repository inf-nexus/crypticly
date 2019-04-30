// @flow

import { Record, List, Map } from 'immutable';

// PasswordGroupKeys
export const GROUP_NAME = 'groupName';
export const PASSWORDS = 'passwords';

class PasswordGroup extends Record(
  {
    groupName: '',
    passwords: new List()
  },
  'PasswordGroup'
) {
  constructor(props) {
    const propMap = Map(props);
    let passwords = propMap.get(PASSWORDS) || [];

    const modifiedPropMap = propMap.merge(
      Map({ [PASSWORDS]: new List(passwords) })
    );

    super(modifiedPropMap);
  }

  getGroupName() {
    return this[GROUP_NAME];
  }

  getPasswords() {
    return this[PASSWORDS];
  }
}

export default PasswordGroup;
