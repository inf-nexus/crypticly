// @flow

import { getDerivedKeyFromPassword } from 'utils/keyGen';
import { encryptToFile, decrypt } from 'utils/cipher';
import { isFileInDir, getSaltFromCryptFile } from 'utils/fileHelper';
import { readDataFromFile } from 'utils/fileHelper';

import CryptFileData, {
  DATA,
  IV,
  SALT,
  ENCRYPTED_DATA
} from 'constants/records/CryptFileData';

import Crypt from 'constants/records/Crypt';
import Credentials from 'constants/records/Credentials';

import * as loginSelectors from 'selectors/login';
import Password from '../constants/records/Password';

const CRYPT_FILE = 'crypt.dat';
const ROOT_DIR = './';

// Action Types

export const INIT_APP = 'INIT_APP';

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
export const UPDATE_CRYPT = 'UPDATE_CRYPT';
// pass map of key value pairs merge on
export const UPDATE_CRYPT_CREDENTIALS = 'UPDATE_CRYPT_CREDENTIALS';

export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const UPDATE_USER_USERNAME = 'UPDATE_USER_USERNAME';

// pass map of key value pairs to merge on
export const DELETE_CRYPT_PASSWORD = 'DELETE_CRYPT_PASSWORD';

// Action Creators

const onInitApp = () => ({
  type: INIT_APP
});

const onUpdateCryptFileData = cryptFileData => ({
  type: UPDATE_CRYPT_FILE_DATA,
  payload: {
    cryptFileData
  }
});

const onLoginAttempt = () => ({
  type: LOGIN_ATTEMPT
});

const onLoginAttemptSuccess = () => ({
  type: LOGIN_ATTEMPT_SUCCESS
});

const onLoginAttemptFailed = error => ({
  type: LOGIN_ATTEMPT_FAILED,
  payload: {
    error
  }
});

const onUpdateCrypt = crypt => ({
  type: UPDATE_CRYPT,
  payload: {
    crypt
  }
});

// Actions

export const initApp = () => (dispatch, getState) => {
  dispatch(onInitApp());
  isFileInDir(ROOT_DIR, CRYPT_FILE).then(cryptExsists => {
    if (cryptExsists) {
      readDataFromFile(CRYPT_FILE).then(data => {
        const cryptFileData = new CryptFileData({ data });
        dispatch(onUpdateCryptFileData(cryptFileData));
      });
    } else {
      const cryptFileData = new CryptFileData({ data: null });
      dispatch(onUpdateCryptFileData(cryptFileData));
    }
  });
};

export const loginAttempt = (username, password) => (dispatch, getState) => {
  const state = getState();
  dispatch(onLoginAttempt());
  let cryptFileData = loginSelectors.getCryptFileData(state);

  const usernameAndPassword = username + password;

  if (cryptFileData.getEncryptedData()) {
    const iv = cryptFileData.getIv();
    const salt = cryptFileData.getSalt();
    const encryptedData = cryptFileData.getEncryptedData();
    getDerivedKeyFromPassword(usernameAndPassword, salt).then(
      ({ key }) => {
        const { data: decryptedData, error } = decrypt(key, iv, encryptedData);
        if (error) {
          dispatch(onLoginAttemptFailed(error.message));
        } else {
          const crypt = new Crypt(decryptedData);
          dispatch(onUpdateCrypt(crypt));
          dispatch(onLoginAttemptSuccess());
        }
      },
      error => {
        dispatch(onLoginAttemptFailed(error.message));
      }
    );
  } else {
    const crypt = new Crypt({ credentials: { username, password } });
    dispatch(onUpdateCrypt(crypt));
    getDerivedKeyFromPassword(usernameAndPassword).then(
      ({ key, salt }) => {
        encryptToFile(CRYPT_FILE, key, salt, crypt.toJS()).then(
          ({ data: encryptedData, iv }) => {
            cryptFileData = new CryptFileData({
              data: [iv, salt, encryptedData].join(':')
            });
            dispatch(onUpdateCryptFileData(cryptFileData));
            dispatch(onLoginAttemptSuccess());
          },
          error => {
            dispatch(onLoginAttemptFailed(error.message));
          }
        );
      },
      error => {
        dispatch(onLoginAttemptFailed(error.message));
      }
    );
  }
};

export const updateCryptPassword = (password: Password) => (
  dispatch,
  getState
) => {
  const updatedCrypt: Crypt = loginSelectors
    .getCrypt(getState())
    .updateCryptPassword(password);
  dispatch(onUpdateCrypt(updatedCrypt));
};
