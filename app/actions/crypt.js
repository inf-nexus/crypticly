// @flow

import { getDerivedKeyFromPassword } from 'utils/keyGen';
import { encryptToFile, decryptFromFile } from 'utils/cipher';
import { isFileInDir, getSaltFromCryptFile } from 'utils/fileHelper';
import { readDataFromFile } from 'utils/fileHelper';

import CryptFileData, {
  CryptFileDataKeys
} from 'constants/records/CryptFileData';

const { DATA, IV, SALT, ENCRYPED_DATA } = CryptFileDataKeys;

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
export const LOAD_ENCRYPTED_CRYPT = 'LOAD_ENCRYPTED_CRYPT';
export const LOAD_ENCRYPTION_ITEMS = 'LOAD_ENCRYPTION_ITEMS';

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

const onLoadEncryptedCrypt = (encryptedCrypt: string | null) => ({
  type: LOAD_CRYPT_DATA,
  payload: {
    encryptedCrypt
  }
});

// const onLoadEncryptionItems = (iv: string, )

// Actions

/**
 *  should be called as soon as app is loaded
 *  responsibilities:
 *    1. load encrypted data from crypt.dat if present
 *    2.
 *
 */
export const initApp = () => (dispatch, getState) => {
  console.log('inside initApp!!!');
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
