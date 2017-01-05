// @flow
import React, { Component } from "react";

class App extends Component {
  props: {
    children: HTMLElement
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
