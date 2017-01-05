// @flow
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { hashHistory } from "react-router";
import { routerMiddleware, push } from "react-router-redux";
import createLogger from "redux-logger";

import rootEpic from "../epics";
import rootReducer from "../reducers";

import * as counterActions from "../actions/counter";

const epicMiddleware = createEpicMiddleware(rootEpic);

let actionCreators = {
  ...counterActions,
  push
};

const logger = createLogger({
  level: "info",
  collapsed: true
});

let middlewares = applyMiddleware(epicMiddleware, routerMiddleware(hashHistory), logger);
let composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(initialState: Object | void) {
  const store = createStore(rootReducer,
    initialState,
    composeEnhancers(middlewares));

  if (module.hot) {
    module.hot.accept("../epics", () => {
      epicMiddleware.replaceEpic(require("../epics").default);
    });
    module.hot.accept("../reducers", () => {
      store.replaceReducer(require("../reducers").default);
    });
  }

  return store;
}
