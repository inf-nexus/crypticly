// @flow

import crypto from 'crypto';

import { writeDataToFile, readDataFromFile } from './fileHelper';

const ENCRYPT_ALGO = 'aes-256-cbc';
const ENCODING = 'hex';
const DELIM = ':';
// const SAMPLE_PASSWORD = 'helloworld123!helloworld123!1231';
// const SAMPLE_DATA = {
//   key1: 'cool param',
//   key2: {
//     arr: [1, 2, 3]
//   }
// };

const encrypt = (key: string, data: any): object => {
  let encrypted = null;
  const iv = crypto.randomBytes(16);

  try {
    let cipher = crypto.createCipheriv(ENCRYPT_ALGO, Buffer.from(key), iv);
    const dataToEncrypt = Buffer.from(JSON.stringify(data)).toString(ENCODING);

    encrypted = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
    const encryptedData =
      iv.toString(ENCODING) + DELIM + encrypted.toString(ENCODING);

    return { data: encryptedData };
  } catch (exception) {
    return { error: exception.message };
  }
};

const decrypt = (key: string, data: string): object => {
  try {
    const dataArr = data.split(DELIM);
    const iv = dataArr[0];
    const encryptedData = dataArr[1];

    let decipher = crypto.createDecipheriv(
      ENCRYPT_ALGO,
      Buffer.from(key),
      Buffer.from(iv, ENCODING)
    );
    let decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, ENCODING)),
      decipher.final()
    ]);
    const obj = JSON.parse(
      Buffer.from(decrypted.toString(), ENCODING).toString()
    );
    return { data: obj };
  } catch (exception) {
    return { error: exception.message };
  }
};

export const encryptToFile = async (
  filepath: string,
  key: string,
  salt: string,
  dataToEncrypt: object
): void => {
  return new Promise((resolve, reject) => {
    const { data, error } = encrypt(key, dataToEncrypt);
    if (data) {
      const saltAndData = salt + delim + data;
      writeDataToFile(filepath, saltAndData).then(resolve(true), error => {
        resolve(false);
      });
    } else {
      // TODO: handle error case
      resolve(false);
      console.log('exception occured while encrypting: ', error);
    }
  });
};

export const decryptFromFile = async (filepath: string, key: string): void => {
  return new Promise((resolve, reject) => {
    readDataFromFile(filepath).then(
      (encryptedData: Buffer) => {
        const { data, salt, error } = decrypt(key, encryptedData);
        if (data) {
          resolve({ data, salt });
        } else {
          // TODO: handle error case
          reject({ error });
        }
      },
      error => {
        reject({ error });
      }
    );
  });
};
