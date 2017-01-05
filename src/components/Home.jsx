// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import "./Home.scss";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div styleName="container">
          <h2><i className="fa fa-spinner fa-spin"></i>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
