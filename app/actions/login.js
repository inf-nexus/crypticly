// @flow

// Action Types

export const INIT_CRYPTO = 'INIT_CRYPTO';
export const INIT_CRYPTO_SUCCESS = 'INIT_CRYPTO_SUCCESS';
export const INIT_CRYPTO_FAILED = 'INIT_CRYPTO_FAILED';

// Action Creators

const onInitCrypto = (username, password) => ({
  type: INIT_CRYPTO,
  payload: { username, password }
});

const onInitCryptoSuccess = () => ({
  type: INIT_CRYPTO_SUCCESS
});

const onInitCryptoFailed = () => ({
  type: INIT_CRYPTO_FAILED
});

// Actions

export const initCrypto = (username, password) => (dispatch, getState) => {
  dispatch(onInitCrypto);
};
