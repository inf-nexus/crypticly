// @flow

import { getDerivedKeyFromPassword } from 'utils/keyGen';
import { encryptToFile, decryptFromFile } from 'utils/cipher';
import { isFileInDir, getSaltFromCryptFile } from 'utils/fileHelper';
import { readDataFromFile } from 'utils/fileHelper';

import CryptFileData, {
  DATA,
  IV,
  SALT,
  ENCRYPTED_DATA
} from 'constants/records/CryptFileData';

import * as loginSelectors from 'selectors/login';

const CRYPT_FILE = 'crypt.dat';
const ROOT_DIR = './';
const DEFAULT_CRYPT = {
  key1: {
    val: 'cool val1'
  },
  key2: ['cool array']
};

// Action Types

export const INIT_APP = 'INIT_APP';

export const LOAD_CRYPT_FILE_DATA = 'LOAD_CRYPT_FILE_DATA';
export const UPDATE_CRYPT_FILE_DATA = 'UPDATE_CRYPT_FILE_DATA';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'; // call as soon as user clicks submit
/**
 * correct username / password entered or success at establishing new credentials
 */
export const LOGIN_ATTEMPT_SUCCESS = 'LOGIN_ATTEMPT_SUCCESS';
export const LOGIN_ATTEMPT_FAILED = 'LOGIN_ATTEMPT_FAILED';
/**
 * attempt to decrypt if crypt.dat present o/w create new crypt.dat
 */

export const INIT_CRYPT = 'INIT_CRYPT_SUCCESS';
/**
 * pass a key value pair to update nested credentials object
 */
export const UPDATE_CRYPT_CREDENTIALS = 'UPDATE_CRYPT_CREDENTIALS';

export const CREATE_CRYPT_PASSWORD = 'ADD_CRYPT_PASSWORD';
export const UPDATE_CRYPT_PASSWORD = 'UPDATE_CRYPT_PASSWORD';
export const DELETE_CRYPT_PASSWORD = 'DELETE_CRYPT_PASSWORD';

// Action Creators

const onInitApp = () => ({
  type: INIT_APP
});

const onLoadCryptFileData = cryptFileData => ({
  type: LOAD_CRYPT_FILE_DATA,
  payload: {
    cryptFileData
  }
});

const onLoginAttempt = () => ({
  type: LOGIN_ATTEMPT
});

// Actions

export const initApp = () => (dispatch, getState) => {
  dispatch(onInitApp());
  isFileInDir(ROOT_DIR, CRYPT_FILE).then(cryptExsists => {
    let cryptFileData;
    if (cryptExsists) {
      readDataFromFile(CRYPT_FILE).then(data => {
        cryptFileData = new CryptFileData({ data });
      });
    } else {
      cryptFileData = new CryptFileData({ data: null });
    }
    dispatch(onLoadCryptFileData(cryptFileData));
  });
};

export const loginAttempt = (username, password) => (dispatch, getState) => {
  const state = getState();
  dispatch(onLoginAttempt());
  const cryptFileData = loginSelectors.getCryptFileData(state);
  const rawData = cryptFileData.getData();

  if (rawData) {
    // TODO: crypt.dat file exsists, use password + IV + SALT to decrypt
  } else {
    /**
     * TODO: crypt.dat file does not exsist, create new profile for user
     * generate derived key, salt, iv, crypt from scratch
     */
  }

  console.log(cryptFileData);
};
