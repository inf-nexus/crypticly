// @flow

import {
  INIT_APP,
  UPDATE_CRYPT_FILE_DATA,
  UPDATE_CRYPT,
  LOGIN_ATTEMPT,
  LOGIN_ATTEMPT_SUCCESS,
  LOGIN_ATTEMPT_FAILED
} from 'actions/login';
import CryptFileData from 'constants/records/CryptFileData';
import * as statusStates from 'constants/statusStates';

const initialState = {
  cryptFileData: null,
  crypt: null,
  loginStatus: statusStates.UNINITIALIZED,
  errors: [] // TODO: set up logic to populate this
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
      return {
        ...state,
        loginStatus: statusStates.FAILED
      };
    }

    default:
      return state;
  }
}
