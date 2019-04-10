// @flow

import crypto from 'crypto';

import { writeDataToFile, readDataFromFile } from './fileHelper';

const AES_256_CBC = 'aes-256-cbc';
const ENCODING = 'binary';
// const SAMPLE_PASSWORD = 'helloworld123!helloworld123!1231';
// const SAMPLE_DATA = {
//   key1: 'cool param',
//   key2: {
//     arr: [1, 2, 3]
//   }
// };

export const encrypt = (password: string, data: any): object => {
  let encrypted = null;
  const iv = crypto.randomBytes(16);

  try {
    let cipher = crypto.createCipheriv(AES_256_CBC, Buffer.from(password), iv);
    const dataToEncrypt = Buffer.from(JSON.stringify(data)).toString(ENCODING);

    encrypted = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
    const encryptedData =
      iv.toString(ENCODING) + ':' + encrypted.toString(ENCODING);

    return { data: encryptedData };
  } catch (exception) {
    return { error: exception.message };
  }
};

export const decrypt = (
  ivAndEncryptedData: string,
  password: string
): object => {
  try {
    const iv = ivAndEncryptedData.split(':')[0];

    const encryptedData = ivAndEncryptedData.split(':')[1];

    let decipher = crypto.createDecipheriv(
      AES_256_CBC,
      Buffer.from(password),
      Buffer.from(iv, ENCODING)
    );
    let decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, ENCODING)),
      decipher.final()
    ]);
    const obj = JSON.parse(decrypted.toString());
    return { data: obj };
  } catch (exception) {
    return { error: exception.message };
  }
};

export const encryptToFile = (
  filepath: string,
  password: string,
  dataToEncrypt: object,
  callback: any => any
): void => {
  const { data, error } = encrypt(password, dataToEncrypt);
  if (data) {
    writeDataToFile(filepath, data).then(
      result => {
        console.log('write success : ', result);
        callback();
      },
      error => {
        console.log('write failed with error: ', error);
      }
    );
  } else {
    // TODO: handle error case
    console.log('exception occured while encrypting: ', error);
  }
};

export const decryptFromFile = (
  filepath: string,
  password: string,
  callback: any => any
): void => {
  readDataFromFile(filepath).then(
    encryptedData => {
      const { data, error } = decrypt(encryptedData, password);
      if (data) {
        callback(data);
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
