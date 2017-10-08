// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";

import HomePage from "./HomePage";
import CounterPage from "./CounterPage";

class Root extends Component<Object, void> {
  props: {
    store: Object,
    history: Object
  };
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact component={HomePage} />
            <Route path="/counter" component={CounterPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Root;
