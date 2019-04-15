// @flow

import { getDerivedKeyFromPassword } from './keyGen';
import { encryptToFile, decryptFromFile } from './cipher';
import { isFileInDir, getSaltFromCryptFile } from './fileHelper';

/**
 * 1. check for presence of crypt.dat
 * 2. generate crypt.dat
 * 3. load data from crypt.dat
 * 4. generate derived key + salt from password
 * 5. update crypt.dat (essentially just an overwrite)
 *  order:
 *      1. user enters username and password
 *      2. check to see if crypt.dat file exists
 *          a. true:
 *              I. attempt to encrypt
 *              II. read crypt.dat and parse out salt
 *              III. use password + salt to get derived key
 *              IV. use derived key to decrypt
 *              V. if succesful JSON.parse in decrypt should work o/w this
 *                 indicates failure, surface to user that password / username
 *                 entered is incorrect o/w redirect user to app
 *          b. false:
 *              I. use password to generate salt + derived key
 *              II. encrypt default Crypt object and write
 *                  this salt + iv + data to crypt.dat
 *              III. redirect user to app
 *
 *          class should also maintain a Crypt object that it constantly upadtes
 *          and persists to crypt.dat file
 *
 *       Nice to haves for later:
 *          - reset password option: will wipe crypt.dat
 *          - surface nice messages on failures
 *          - limit the amount of time a user can enter wrong password
 *
 */

const CRYPT_FILE = 'crypt.dat';
const ROOT_DIR = './';
const DEFAULT_CRYPT = {
  key1: {
    val: 'cool val1'
  },
  key2: ['cool array']
};

class CryptManager {
  constructor() {
    this.derivedKey = null;
    this.salt = null;
    this.crypt = null; // TODO: should actually be immutable Crypt
  }

  // will attempt to generate and set derived key
  // returns whether the operation was successful or not
  async initCrypt(password: string): boolean {
    const cryptExsists = await isFileInDir(ROOT_DIR, CRYPT_FILE);
    // let salt = null;
    if (cryptExsists) {
      // read crypt.dat
      // parse out salt
    }
    const { key, salt, error } = await getDerivedKeyFromPassword(password);

    if (key && salt) {
      this.derivedKey = key;
      this.salt = salt;
      this.crypt = DEFAULT_CRYPT;

      console.log('key: ', key);
      console.log('salt: ', salt);
      return true;
    } else {
      // TODO: handle error
      console.log('error initializing crypt, reenter password: ', error);
    }
    return false;

    // generateCrypt()
  }

  // update crypt
  updateCrypt(crypt) {}
}

export default CryptManager;
