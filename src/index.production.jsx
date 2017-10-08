// @flow
import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import configureStore from "./store/configureStore.prd";

import Root from "./containers/Root";

const history = createHistory();

let appNode = document.createElement("div");
document.body.appendChild(appNode);

const store = configureStore(history);
ReactDOM.render(<Root store={store} history={history} />, appNode);
