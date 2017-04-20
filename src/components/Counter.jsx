// @flow
import React from "react";
import { Link } from "react-router";
import "./Counter.scss";
import js from "./Counter.json";

import type { State } from "../States";

export type CounterProps = {
  incrementCounter: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrementCounter: () => void,
  counter: number
};

export default class Counter
  extends React.Component<void, CounterProps, State> {
  state: State;

  constructor(props: CounterProps) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    const {
      incrementCounter,
      incrementIfOdd,
      incrementAsync,
      decrementCounter,
      counter
    } = this.props;
    return (
      <div>
        <div styleName="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div styleName="counter">
          {counter} {js.aaa}
        </div>
        <div styleName="btnGroup">
          <button styleName="btn" onClick={incrementCounter}>
            <i className="fa fa-plus" />
          </button>
          <button styleName="btn" onClick={decrementCounter}>
            <i className="fa fa-minus" />
          </button>
          <button styleName="btn" onClick={incrementIfOdd}>odd</button>
          <button styleName="btn" onClick={() => incrementAsync()}>
            async
          </button>
        </div>
      </div>
    );
  }
}
