// @flow

import crypto from 'crypto';

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
import EncryptElements from 'constants/records/EncryptElements';

import * as loginSelectors from 'selectors/login';
import Password from '../constants/records/Password';

const CRYPT_FILE = 'crypt.dat';
const ROOT_DIR = './';

// Action Types

export const INIT_APP = 'INIT_APP';
export const UPDATE_CRYPT_FILE_DATA = 'UPDATE_CRYPT_FILE_DATA';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'; // call as soon as user clicks submit
export const LOGIN_ATTEMPT_SUCCESS = 'LOGIN_ATTEMPT_SUCCESS';
export const LOGIN_ATTEMPT_FAILED = 'LOGIN_ATTEMPT_FAILED';
export const UPDATE_CRYPT = 'UPDATE_CRYPT';
// export const UPDATE_CRYPT_CREDENTIALS = 'UPDATE_CRYPT_CREDENTIALS';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const UPDATE_USER_USERNAME = 'UPDATE_USER_USERNAME';
export const UPDATE_ENCRYPT_ELEMENTS = 'UPDATE_ENCRYPT_ELEMENTS';

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

const onUpdateCrypt = (crypt: Crypt) => ({
  type: UPDATE_CRYPT,
  payload: {
    crypt
  }
});

export const onUpdateEncryptElements = (encryptElements: EncryptElements) => ({
  type: UPDATE_ENCRYPT_ELEMENTS,
  payload: {
    encryptElements
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
          updateEncryptElements(usernameAndPassword)(dispatch, getState);
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
            updateEncryptElements(usernameAndPassword)(dispatch, getState);
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

const updateEncryptElements = (usernameAndPassword: string) => (
  dispatch,
  getState
) => {
  getDerivedKeyFromPassword(usernameAndPassword).then(
    ({ key, salt }) => {
      const iv = crypto.randomBytes(16).toString('hex');
      const encryptElements = new EncryptElements({
        encryptKey: key,
        iv,
        salt
      });
      dispatch(onUpdateEncryptElements(encryptElements));
    },
    error => {
      console.log('error generating password');
    }
  );
};

export const updateCryptPassword = (password: Password) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    const updatedCrypt: Crypt = loginSelectors
      .getCrypt(getState())
      .updateCryptPassword(password);
    dispatch(onUpdateCrypt(updatedCrypt));
    resolve();
  });
};

export const saveCrypt = () => (dispatch, getState) => {
  const state = getState();
  const encryptElements: EncryptElements = loginSelectors.getEncryptElements(
    state
  );
  const crypt: Crypt = loginSelectors.getCrypt(state);
  const encryptKey = encryptElements.getEncryptKey();
  const iv = encryptElements.getIv();
  const salt = encryptElements.getSalt();

  encryptToFile(CRYPT_FILE, encryptKey, salt, crypt.toJS()).then(
    ({ data: encryptedData, iv }) => {
      cryptFileData = new CryptFileData({
        data: [iv, salt, encryptedData].join(':')
      });
      dispatch(onUpdateCryptFileData(cryptFileData));
    },
    error => {
      console.log('encrypting to file failed: ', error.message);
    }
  );
};
