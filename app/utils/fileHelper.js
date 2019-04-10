// @flow

import FileSystem from 'fs';

export const writeDataToFile = (filepath: string, data: string) => {
  return new Promise((resolve, reject) => {
    FileSystem.writeFile(filepath, (data, error) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const readDataFromFile = (filepath: string) => {
  return new Promise((resolve, reject) => {
    FileSystem.readFile(filepath, (data, error) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};
