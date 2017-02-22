// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import * as CounterActions from "../actions/counter";

import type { CounterProps } from "../components/Counter";
import type { State } from "../States";

function mapStateToProps(state: State): CounterProps {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
