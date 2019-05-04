// @flow

import {
  INIT_APP,
  UPDATE_CRYPT_FILE_DATA,
  UPDATE_CRYPT,
  LOGIN_ATTEMPT,
  LOGIN_ATTEMPT_SUCCESS,
  LOGIN_ATTEMPT_FAILED,
  UPDATE_CRYPT_PASSWORD,
  UPDATE_ENCRYPT_ELEMENTS
} from 'actions/login';
import CryptFileData from 'constants/records/CryptFileData';
import Crypt from 'constants/records/Crypt';
import EncryptElements from 'constants/records/EncryptElements';
import * as statusStates from 'constants/statusStates';

const initialState = {
  cryptFileData: null,
  crypt: new Crypt(),
  encryptElements: new EncryptElements(),
  loginStatus: statusStates.UNINITIALIZED,
  error: null
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case INIT_APP: {
      return state;
    }

    case UPDATE_CRYPT_FILE_DATA: {
      const { cryptFileData } = action.payload;
      return {
        ...state,
        cryptFileData
      };
    }

    case UPDATE_CRYPT: {
      const { crypt } = action.payload;
      return {
        ...state,
        crypt
      };
    }

    case LOGIN_ATTEMPT: {
      return {
        ...state,
        loginStatus: statusStates.PENDING
      };
    }

    case LOGIN_ATTEMPT_SUCCESS: {
      return {
        ...state,
        loginStatus: statusStates.SUCCESS
      };
    }

    case LOGIN_ATTEMPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loginStatus: statusStates.FAILED,
        error
      };
    }

    case UPDATE_ENCRYPT_ELEMENTS: {
      const { encryptElements } = action.payload;
      return {
        ...state,
        encryptElements
      };
    }

    default:
      return state;
  }
}
