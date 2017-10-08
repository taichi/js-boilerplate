// @flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerReducer, routerMiddleware } from "react-router-redux";
import reducers from "../reducers";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(history: any) {
  let enhancer = applyMiddleware(epicMiddleware, routerMiddleware(history));
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    enhancer
  );
}
