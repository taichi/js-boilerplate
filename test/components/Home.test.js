// @flow
import test from "ava";

import "ignore-styles";
import "../global.setup";

import React from "react";
import { shallow, mount } from "enzyme";

import Home from "components/Home";

test("shallow", t => {
  const wrapper = shallow(<Home />);
  t.is(wrapper.contains(<i className="fa fa-spinner fa-spin" />), true);
});

test("mount", t => {
  const wrapper = mount(<Home />);
  const fooInner = wrapper.find(".fa-spin");
  t.is(fooInner.is(".fa-spin"), true);
});
