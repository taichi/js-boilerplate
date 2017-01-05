// @flow
import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./App";
import HomePage from "./HomePage";
import CounterPage from "./CounterPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
