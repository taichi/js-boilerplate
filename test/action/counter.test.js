// @flow
import test from "ava";
import { incrementCounter } from "actions/counter";

test(t => {
  t.deepEqual(incrementCounter(), { type: "INCREMENT_COUNTER" });
});
