// @flow
import test from "ava";
import createAction from "utils/createAction";
import td from "testdouble";

test("make simple action", t => {
  t.deepEqual(createAction("INCREMENT_COUNTER")(), {
    type: "INCREMENT_COUNTER"
  });
});

test("with payloadCreator", t => {
  let input = "aaa";
  let ret = "bbb";

  let fn = td.function();
  let action = createAction("ACTION", fn);
  td.when(fn(input)).thenReturn(ret);
  t.deepEqual(action(input), { type: "ACTION", payload: ret });
});
