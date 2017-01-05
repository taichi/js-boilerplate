// @flow
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { hashHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware(rootEpic);
let enhancer = applyMiddleware(epicMiddleware, routerMiddleware(hashHistory));

export default function configureStore(initialState: Object | void) {
  return createStore(rootReducer, initialState, enhancer);
}
