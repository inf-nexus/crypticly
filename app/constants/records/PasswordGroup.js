// @flow

import { Record, List } from 'immutable';

class PasswordGroup extends Record(
  {
    groupName: null,
    passwords: new List()
  },
  'PasswordGroup'
) {}

export default PasswordGroup;
