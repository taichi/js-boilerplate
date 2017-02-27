// @flow
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const INCREMENT_IF_ODD = "INCREMENT_IF_ODD";
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export type IncrementCounter = { type: "INCREMENT_COUNTER" };
export type IncrementIfOdd = { type: "INCREMENT_IF_ODD" };
export type IncrementAsync = { type: "INCREMENT_ASYNC", payload: number };
export type DecrementCounter = { type: "DECREMENT_COUNTER" };

export type Action =
  | IncrementCounter
  | IncrementIfOdd
  | IncrementAsync
  | DecrementCounter;
