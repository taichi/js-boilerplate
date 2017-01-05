// @flow
import { combineEpics } from "redux-observable";
import { incrementIfOddEpic, incrementAsyncEpic } from "./counter";

export default combineEpics(
  incrementIfOddEpic, incrementAsyncEpic
);
