import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import ControlForm from "./controlForm";

class App extends Component {

  render() {
    const { dispatch, size } = this.props;
    return (
        <ControlForm size={size} onSizeChange={
          s => {
            dispatch({ type: "SIZE_CHANGE", size: s });
          }}
        />
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

function select(state) {
  return state;
}

export default connect(select)(App);
