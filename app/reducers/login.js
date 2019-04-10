// @flow

import {
  INIT_CRYPTO,
  INIT_CRYPTO_SUCCESS,
  INIT_CRYPTO_FAILED
} from 'actions/login';

const initialState = {};

export default function login(state = initialState, action) {
  switch (action.type) {
    case INIT_CRYPTO: {
      const { username, password } = action.payload;
      // TODO: use Crypto utils to check if crypt.dat is in dir
      // if present attempt to decrypt using username / password
      // ow create new Crypt object and save the POJ to crypt.dat file
      return state;
    }

    case INIT_CRYPTO_SUCCESS: {
      return state;
    }

    case INIT_CRYPTO_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
