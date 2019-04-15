// @flow

import { INIT_APP, LOAD_CRYPT_FILE_DATA } from 'actions/crypt';
import CryptFileData from 'constants/records/CryptFileData';

const initialState = {
  cryptFileData: new CryptFileData(),
  encryptedCrypt: null,
  crypt: null
};

export default function crypt(state = initialState, action) {
  switch (action.type) {
    case INIT_APP: {
      return state;
    }

    case LOAD_CRYPT_FILE_DATA: {
      const { cryptFileData } = action.payload;
      return {
        cryptFileData,
        ...state
      };
    }

    default:
      return state;
  }
}
