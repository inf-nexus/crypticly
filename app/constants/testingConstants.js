import Password from 'constants/records/Password';
import PasswordGroup from 'constants/records/PasswordGroup';
import { List } from 'immutable';

const password1 = new Password({
  username: 'jdoe',
  password: 'helloworld1',
  name: 'facebook',
  url: 'https://facebook.com',
  lastUpdated: 'May 11, 2014',
  group: 'Social Media',
  passwordLength: 11,
  lettersEnabled: true,
  specialCharsEnabled: false,
  uppercaseEnabled: true,
  manualEntryEnabled: false
});

const password2 = new Password({
  username: 'jdoe2',
  password: 'blahfdsanj32',
  name: 'twitter',
  url: 'https://twitter.com',
  lastUpdated: 'May 12, 2014',
  group: 'Social Media',
  passwordLength: 11,
  lettersEnabled: true,
  specialCharsEnabled: false,
  uppercaseEnabled: true,
  manualEntryEnabled: false
});

const password3 = new Password({
  username: 'jdoe3',
  password: 'blahfdsanj32',
  name: 'bank account',
  url: 'https://captialone.com',
  lastUpdated: 'May 12, 2014',
  group: 'Banking',
  passwordLength: 11,
  lettersEnabled: true,
  specialCharsEnabled: false,
  uppercaseEnabled: true,
  manualEntryEnabled: false
});

const passwordGroup1 = new PasswordGroup({
  groupName: 'Social Media',
  passwords: [password1, password2]
});

const passwordGroup2 = new PasswordGroup({
  groupName: 'Banking',
  passwords: [password3]
});

export const passwordGroups = new List([passwordGroup1, passwordGroup2]);
