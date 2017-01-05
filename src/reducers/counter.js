// @flow
import * as ActionTypes from "../ActionTypes";
import createReducers from "../utils/createReducers";

export default createReducers(0,
  [ActionTypes.INCREMENT_COUNTER, state => state + 1],
  [ActionTypes.DECREMENT_COUNTER, state => state - 1]
);
