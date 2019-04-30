const specialChars = ' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const nums = '123456789';

const getCharacterSet = (
  lettersEnabled = true,
  uppercaseEnabled = true,
  specialCharsEnabled = true,
  numsEnabled = true
) => {
  let characterSet = [];
  if (lettersEnabled) {
    characterSet.push(lowercaseChars);
  }
  if (uppercaseEnabled) {
    characterSet.push(uppercaseChars);
  }
  if (specialCharsEnabled) {
    characterSet.push(specialChars);
  }
  if (numsEnabled) {
    characterSet.push(nums);
  }
  return characterSet.join('');
};

const generateRandomNumbers = (numRange, numCount) => {
  let randomNumArr = [];
  for (let i = 0; i < numCount; i++) {
    const randomNum = Math.floor(Math.random() * numRange);
    randomNumArr.push(randomNum);
  }
  return randomNumArr;
};

export const generateRandomPassword = (
  lettersEnabled = true,
  uppercaseEnabled = true,
  specialCharsEnabled = true,
  numsEnabled = true,
  passwordLength = 10
) => {
  const characterSet = getCharacterSet(
    lettersEnabled,
    uppercaseEnabled,
    specialCharsEnabled,
    numsEnabled
  );
  const randomNumsArr = generateRandomNumbers(
    characterSet.length,
    passwordLength
  );
  const randomPassword = randomNumsArr.map(num => characterSet[num]).join('');
  return randomPassword;
};
