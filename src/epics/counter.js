// @flow
import "rxjs/Rx";
import type { ActionsObservable, MiddlewareAPI } from "redux-observable";
import { Observable } from "rxjs/Observable";

import * as ActionTypes from "../ActionTypes";
import type { Action, IncrementAsync } from "../ActionTypes";
import { incrementCounter } from "../actions/counter";

export const incrementIfOddEpic = (action$: ActionsObservable<Action>, store: MiddlewareAPI<any>) => action$
  .ofType(ActionTypes.INCREMENT_IF_ODD)
  .filter(() => store.getState().counter % 2 === 0)
  .map(incrementCounter);

export const incrementAsyncEpic = (action$: ActionsObservable<IncrementAsync>) => action$
  .ofType(ActionTypes.INCREMENT_ASYNC)
  // $FlowFixMe: https://github.com/flowtype/flow-typed/pull/427
  .mergeMap(action => Observable.timer(action.payload))
  .map(incrementCounter);
