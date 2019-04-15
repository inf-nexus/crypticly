// @flow

import FileSystem from 'fs';

const CRYPT_FILE = 'crypt.dat';
const DELIM = ':';

export const writeDataToFile = (filepath: string, data: string) => {
  return new Promise((resolve, reject) => {
    FileSystem.writeFile(filepath, data, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};

export const readDataFromFile = (filepath: string) => {
  return new Promise((resolve, reject) => {
    FileSystem.readFile(filepath, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data.toString());
    });
  });
};

export const isFileInDir = (dir, fileName) => {
  return new Promise((resolve, reject) => {
    FileSystem.readdir(dir, (err, files) => {
      if (files.indexOf(fileName) !== -1) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

// export const getSaltFromCryptFile = async () => {
//   const { data, error } = await readDataFromFile(CRYPT_FILE);
//   if (data) {
//     const salt = data.split(DELIM)[0];
//     return salt;
//   }
//   // TODO: handle error
//   console.log('error occured reading from crypt');
//   return null;
// };
