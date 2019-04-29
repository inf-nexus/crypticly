// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import styled, { ThemeProvider } from 'styled-components';
import type { Store } from '../reducers/types';
import Routes from 'Routes';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment('jss-insertion-point');
// $FlowFixMe
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point'
});

const theme = {
  main: {
    colors: {
      primary: '#383838',
      secondary: '#282828'
    }
  },
  text: {
    colors: {
      primary: 'white',
      secondary: 'black'
    }
  }
};

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </Provider>
        </ThemeProvider>
      </JssProvider>
    );
  }
}
