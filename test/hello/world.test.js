// @flow
import test from "ava";

import world from "hello/world";

test("simple call", t => {
  t.is(world(), "Hello World");
});

test("call with name", t => {
  t.is(world("John"), "Hello John");
});
