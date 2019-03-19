// @flow
// import electron from 'electron';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class Counter extends Component<Props> {
  props: Props;

  resizeWindow() {}

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;
    return (
      <div>
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div data-tid="counter">{counter}</div>
        <div>
          <button onClick={increment} data-tclass="btn" type="button">
            <i className="fa fa-plus" />
          </button>
          <button onClick={decrement} data-tclass="btn" type="button">
            <i className="fa fa-minus" />
          </button>
          <button onClick={incrementIfOdd} data-tclass="btn" type="button">
            odd
          </button>
          <button
            onClick={() => incrementAsync()}
            data-tclass="btn"
            type="button"
          >
            async
          </button>
          <button onClick={this.resizeWindow} data-tclass="btn" type="button">
            resize window
          </button>
        </div>
      </div>
    );
  }
}
