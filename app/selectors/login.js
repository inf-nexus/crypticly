// @flow

import R from 'ramda';

export const getCryptFileData = state => {
  return R.path(['login', 'cryptFileData'])(state);
};

export const getCrypt = state => {
  return R.path(['login', 'crypt'])(state);
};

export const getLoginStatus = state => {
  return R.path(['login', 'loginStatus'], state);
};

export const getPasswordGroups = state => {
  return R.path(['login', 'crypt', 'passwordGroups'])(state);
};
