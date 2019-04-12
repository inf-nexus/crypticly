// @flow

import FileSystem from 'fs';

const ENCODING = 'hex';

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

export const readDataFromFile = (filepath: string, callback) => {
  return new Promise((resolve, reject) => {
    FileSystem.readFile(filepath, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data.toString());
    });
  });
};
