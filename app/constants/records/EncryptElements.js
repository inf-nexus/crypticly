// @flow

import { Record } from 'immutable';

// EncryptElementsKeys
export const ENCRYPT_KEY = 'encryptKey';
export const IV = 'iv';
export const SALT = 'salt';

class EncryptElements extends Record(
  {
    [ENCRYPT_KEY]: null,
    [IV]: null,
    [SALT]: null
  },
  'CryptFileData'
) {
  constructor(props) {
    super(props);
  }

  getEncryptKey() {
    return this[ENCRYPT_KEY];
  }

  getIv() {
    return this[IV];
  }

  getSalt() {
    return this[SALT];
  }
}

export default EncryptElements;
