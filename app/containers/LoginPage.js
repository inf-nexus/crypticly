// @flow

import React, { Component } from 'react';
import UILoginPage from 'components/Login/UILoginPage';

// TODO: remove import after testing
import { encryptToFile, decryptFromFile } from 'utils/cipher';

const fs = window.require('fs');

const rootDir = './';

const isRegistered = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(rootDir, (err, files) => {
      console.log(files);
      if (files.indexOf('crypt.dat') !== -1) {
        resolve(true);
      }
      resolve(false);
      console.log(files);
    });
  });
};

const cipherTest = () => {
  const password = 'helloworld123!helloworld123!1231';
  const dataObj = {
    key1: 'cool param',
    key2: {
      arr: [1, 2, 3]
    }
  };
  const filepath = 'crypt.dat';
  const encryptCallback = function() {};
  encryptToFile(filepath, password, dataObj);
  decryptFromFile(filepath, password, data => {
    console.log('decrypted data: ', data);
  });

  // const { data: encryptedData, error } = encrypt(password, dataObj);
  // if (encryptedData) {
  //   const { data: decryptedData, error } = decrypt(encryptedData, password);

  //   if (decryptedData) {
  //     console.log('decryptedData: ', decryptedData);
  //   }
  // } else {
  //   console.log(error);
  // }
};

type Props = {};

type State = {
  authenticated: boolean
};

class LoginPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };

    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
  }

  handleUserAuthentication(username: string, password: string) {
    // TODO: password checking here
    // this.setState({ authenticated: true });
    // console.log('username: ', username, 'password: ', password);
    // isRegistered();
    cipherTest();
  }

  render() {
    const { authenticated } = this.state;
    return (
      <UILoginPage
        authenticated={authenticated}
        onLoginClicked={this.handleUserAuthentication}
      />
    );
  }
}

export default LoginPage;
