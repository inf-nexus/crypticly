// @flow

import crypto from 'crypto';
import { reject } from 'bluebird-lst';

const DIGEST = 'sha512';
const ITERATIONS = 100000;
const KEY_LEN = 32; // for use with AES
const ENCODING = 'hex';

export const getDerivedKeyFromPassword = (
  password: string,
  salt: string = null
): object => {
  return new Promise((resolve, reject) => {
    const nextSalt = crypto.randomBytes(32);
    crypto.pbkdf2(
      password,
      Buffer.from(salt, ENCODING) || nextSalt,
      ITERATIONS,
      KEY_LEN,
      DIGEST,
      (error, derivedKey) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        // console.log(derivedKey);
        resolve({
          key: derivedKey.toString('hex'),
          salt: nextSalt.toString('hex')
        });
      }
    );
  });
};
