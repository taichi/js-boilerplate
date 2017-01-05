// @flow
import createAction from "../utils/createAction";

import * as ActionTypes from "../ActionTypes";

export const incrementCounter = createAction(ActionTypes.INCREMENT_COUNTER);
export const decrementCounter = createAction(ActionTypes.DECREMENT_COUNTER);
export const incrementIfOdd = createAction(ActionTypes.INCREMENT_IF_ODD);
export const incrementAsync = createAction(ActionTypes.INCREMENT_ASYNC, (delay: number = 1000) => delay);
