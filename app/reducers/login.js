// @flow

import { INIT_APP, LOAD_CRYPT_FILE_DATA } from 'actions/login';
import CryptFileData from 'constants/records/CryptFileData';

const initialState = {
  cryptFileData: null,
  crypt: null
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case INIT_APP: {
      return state;
    }

    case LOAD_CRYPT_FILE_DATA: {
      const { cryptFileData } = action.payload;
      return {
        ...state,
        cryptFileData
      };
    }

    default:
      return state;
  }
}
