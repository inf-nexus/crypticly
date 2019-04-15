// @flow

import { Record, Map } from 'immutable';

const DATA = 'data';
const IV = 'iv';
const SALT = 'salt';
const ENCRYPED_DATA = 'encryptedData';

export const CryptFileDataKeys = {
  DATA,
  IV,
  SALT,
  ENCRYPED_DATA
};

class CryptFileData extends Record(
  {
    [DATA]: null,
    [IV]: null,
    [SALT]: null,
    [ENCRYPED_DATA]: null
  },
  'CryptFileData'
) {
  constructor(props) {
    const propMap = Map(props);
    const data = propMap.get(DATA);
    const splitData = data ? data.split(':') : null;
    let iv = null;
    let salt = null;
    let encryptedData = null;

    if (splitData) {
      iv = splitData[0];
      salt = splitData[1];
      encryptedData = splitData[2];
    }

    const modifiedPropMap = propMap.merge(
      Map({ [IV]: iv, [SALT]: salt, [ENCRYPED_DATA]: encryptedData })
    );
    console.log('modifiedPropMap: ', modifiedPropMap.toJS());
    super(modifiedPropMap);
  }
}

export default CryptFileData;
