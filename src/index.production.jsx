// @flow
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore.prd";

import Root from "./containers/Root";

let appNode = document.createElement("div");
document.body.appendChild(appNode);

const store = configureStore();
ReactDOM.render(<Root store={store} />, appNode);
