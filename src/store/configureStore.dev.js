// @flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { routerReducer, routerMiddleware, push } from "react-router-redux";
import { createLogger } from "redux-logger";

import rootEpic from "../epics";
import reducers from "../reducers";

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

export default function configureStore(history: Object) {
  let composeEnhancers = composeWithDevTools({ actionCreators });
  let middlewares = applyMiddleware(
    epicMiddleware,
    routerMiddleware(history),
    logger
  );

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    composeEnhancers(middlewares)
  );

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
