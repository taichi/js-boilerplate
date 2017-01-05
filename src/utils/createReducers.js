// @flow
import type { Action } from "../ActionTypes";
import type { Reducer, State } from "../States";

export default function <S: State>(initialState: S, ...keyAndFunctions: Array<[string, Reducer<S>]>) {
  let map = new Map(keyAndFunctions);
  return (state: S = initialState, action: Action) => {
    let fn = map.get(action.type);
    return fn ? fn(state, action) : state;
  };
}
