// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export default class Home extends Component<void, void> {
  render() {
    return (
      <div>
        <div styleName="container">
          <h2>
            <i className="fa fa-spinner fa-spin" />Home
          </h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
