// @flow

import crypto from 'crypto';

import { writeDataToFile, readDataFromFile } from './fileHelper';

const ENCRYPT_ALGO = 'aes-256-cbc';
const ENCODING = 'hex';
const DELIM = ':';

const encrypt = (key: string, data: any): object => {
  let encrypted = null;
  const iv = crypto.randomBytes(16);

  try {
    let cipher = crypto.createCipheriv(
      ENCRYPT_ALGO,
      Buffer.from(key, ENCODING),
      iv
    );
    const dataToEncrypt = Buffer.from(JSON.stringify(data)).toString(ENCODING);

    encrypted = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
    const encryptedData = encrypted.toString(ENCODING);
    // iv.toString(ENCODING) + DELIM + encrypted.toString(ENCODING);

    return { data: encryptedData, iv: iv.toString(ENCODING) };
  } catch (exception) {
    return { error: exception.message };
  }
};

export const decrypt = (
  key: string,
  iv: string,
  encryptedData: string
): object => {
  try {
    // const dataArr = data.split(DELIM);
    // const iv = dataArr[0];
    // const encryptedData = dataArr[1];

    let decipher = crypto.createDecipheriv(
      ENCRYPT_ALGO,
      Buffer.from(key, ENCODING),
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
  key: string,
  salt: string,
  dataToEncrypt: object
): void => {
  return new Promise((resolve, reject) => {
    // console.log('byte size: ', Buffer.from(key).byteLength('hex'));
    const { data, iv, error } = encrypt(key, dataToEncrypt);
    if (data) {
      const ivSaltData = iv + DELIM + salt + DELIM + data;
      writeDataToFile(filepath, ivSaltData).then(
        resolve({ data, iv }),
        error => {
          resolve(error);
        }
      );
    } else {
      // TODO: handle error case
      resolve(false);
      console.log('exception occured while encrypting: ', error);
    }
  });
};

// export const decryptFromFile = async (filepath: string, key: string): void => {
//   return new Promise((resolve, reject) => {
//     readDataFromFile(filepath).then(
//       (encryptedData: Buffer) => {
//         const { data, salt, error } = decrypt(key, encryptedData);
//         if (data) {
//           resolve({ data, salt });
//         } else {
//           // TODO: handle error case
//           reject({ error });
//         }
//       },
//       error => {
//         reject({ error });
//       }
//     );
//   });
// };
