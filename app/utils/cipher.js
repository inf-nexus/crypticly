// @flow

import crypto from 'crypto';

import { writeDataToFile, readDataFromFile } from './fileHelper';

const ENCRYPT_ALGO = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_DATA_DELIM = ':';
// const SAMPLE_PASSWORD = 'helloworld123!helloworld123!1231';
// const SAMPLE_DATA = {
//   key1: 'cool param',
//   key2: {
//     arr: [1, 2, 3]
//   }
// };

const encrypt = (password: string, data: any): object => {
  let encrypted = null;
  const iv = crypto.randomBytes(16);

  try {
    let cipher = crypto.createCipheriv(ENCRYPT_ALGO, Buffer.from(password), iv);
    const dataToEncrypt = Buffer.from(JSON.stringify(data)).toString(ENCODING);

    encrypted = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
    const encryptedData =
      iv.toString(ENCODING) + IV_DATA_DELIM + encrypted.toString(ENCODING);

    return { data: encryptedData };
  } catch (exception) {
    return { error: exception.message };
  }
};

const decrypt = (ivAndEncryptedData: string, password: string): object => {
  try {
    const iv = ivAndEncryptedData.split(IV_DATA_DELIM)[0];
    const encryptedData = ivAndEncryptedData.split(IV_DATA_DELIM)[1];

    let decipher = crypto.createDecipheriv(
      ENCRYPT_ALGO,
      Buffer.from(password),
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

export const encryptToFile = (
  filepath: string,
  password: string,
  dataToEncrypt: object,
  successCallback: any => any = () => {
    console.log('write success!');
  }
): void => {
  const { data, error } = encrypt(password, dataToEncrypt);
  if (data) {
    writeDataToFile(filepath, data).then(successCallback, error => {
      console.log('write failure!');
    });

    // writeDataToFile(filepath, data);
  } else {
    // TODO: handle error case
    console.log('exception occured while encrypting: ', error);
  }
};

export const decryptFromFile = (
  filepath: string,
  password: string,
  successCallback: any => any
): void => {
  readDataFromFile(filepath).then(
    (encryptedData: Buffer) => {
      const { data, error } = decrypt(encryptedData, password);
      if (data) {
        successCallback(data);
      } else {
        // TODO: handle error case
        console.log('exception occured while decrypting: ', error);
      }
    },
    error => {
      console.log('error occured while reading file: ', error);
    }
  );
};
