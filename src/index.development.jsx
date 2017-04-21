// @flow
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore from "./store/configureStore.dev";

import Root from "./containers/Root";

let appNode = document.createElement("div");
document.body.appendChild(appNode);

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  appNode
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    let NewRoot = require("./containers/Root").default;
    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      appNode
    );
  });
}
