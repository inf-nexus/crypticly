// @flow

import { Record, Map } from 'immutable';

// CryptFileDataKeys
export const DATA = 'data';
export const IV = 'iv';
export const SALT = 'salt';
export const ENCRYPTED_DATA = 'encryptedData';

class CryptFileData extends Record(
  {
    [DATA]: null,
    [IV]: null,
    [SALT]: null,
    [ENCRYPTED_DATA]: null
  },
  'CryptFileData'
) {
  constructor(props) {
    const propMap = Map(props);
    let data = propMap.get(DATA);
    const splitData = data ? data.split(':') : null;
    let iv = null;
    let salt = null;
    let encryptedData = null;

    if (splitData && splitData.length === 3) {
      iv = splitData[0];
      salt = splitData[1];
      encryptedData = splitData[2];
    }
    const modifiedPropMap = propMap.merge(
      Map({ [IV]: iv, [SALT]: salt, [ENCRYPTED_DATA]: encryptedData })
    );
    super(modifiedPropMap);
  }

  getIv() {
    return this.IV;
  }

  getSalt() {
    return this.SALT;
  }

  getEncryptedData() {
    return this.ENCRYPTED_DATA;
  }

  getData() {
    return this.DATA;
  }
}

export default CryptFileData;
