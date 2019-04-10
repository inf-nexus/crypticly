// @flow

// import bcrypt from 'bcrypt';
import crypto from 'crypto';

const salt = 10;
const password = 'password';

const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
const alphaNumericCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const characterSet = [alphaNumericCharacters, specialCharacters]
  .join('')
  .split('');

// TODO: implement an encryption key generator using pbkdf2 to for use in
// cipher encrypt / decrypt for master password

// TODO: implement a random password generator that allows for selection
// of permissable characters, length, etc.

// const generatePassword = (password, salt) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) {
//         reject(err);
//       }
//       resolve({ hashedPassword: hash });
//     });
//   });
// };

// const comparePasswords = (password, hash) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, hash, (err, res) => {
//       if (res) {
//         resolve({ res });
//       } else {
//         reject({ msg: 'passwords dont match' });
//       }
//     });
//   });
// };

//   crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
//     if (err) throw err;
//     derivedKey = derivedKey.toString('hex');  // '3745e48...08d59ae'
//     const plainTextKey = convertHexStringToPlainText(derivedKey, characterSet);
//     console.log(plainTextKey);
//   });

const convertHexToAscii = (hexByteString, charSet) => {
  return charSet[parseInt(hexByteString, 16) % charSet.length];
};

const convertHexToByteArray = hexString => {
  let byteArray = [];
  let byte = [];
  for (let i = 0; i < hexString.length; i++) {
    byte.push(hexString.charAt(i));
    if ((i + 1) % 2 === 0) {
      byteArray.push(byte.join(''));
      byte = [];
    }
  }
  return byteArray;
};

const convertByteArrayToPlainText = (byteArray, charSet) => {
  let plainText = [];
  for (let i = 0; i < byteArray.length; i++) {
    plainText.push(convertHexToAscii(byteArray[i], charSet));
  }
  return plainText.join('');
};

const convertHexStringToPlainText = (hexString, charSet) => {
  return convertByteArrayToPlainText(convertHexToByteArray(hexString), charSet);
};
