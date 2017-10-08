// @flow
import test from "ava";
import React from "react";
import { configure, shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "components/Home";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("shallow", t => {
  const wrapper = shallow(<Home />);
  t.is(wrapper.contains(<i className="fa fa-spinner fa-spin" />), true);
});

test("mount", t => {
  const wrapper = mount(
    <Router>
      <Home />
    </Router>
  );
  const fooInner = wrapper.find(".fa-spin");
  t.is(fooInner.is(".fa-spin"), true);
});
