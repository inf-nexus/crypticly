// @flow

import R from 'ramda';

export const getCryptFileData = state => {
  return R.path(['login', 'cryptFileData'])(state);
};
