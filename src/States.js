// @flow
import type { Action } from "./ActionTypes";

export type Reducer<S: State> = (state: S, action: Action) => S;

export type State = number;
