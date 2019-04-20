// @flow

import R from 'ramda';

export const getCryptFileData = state => {
  return R.path(['login', 'cryptFileData'])(state);
};

export const getLoginStatus = state => {
  return R.path(['login', 'loginStatus'], state);
};
