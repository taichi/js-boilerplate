// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import routes from "./routes";

class Root extends Component {
  props: {
    store: Object
  };
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(hashHistory, store);
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

export default Root;
