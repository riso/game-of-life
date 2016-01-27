import React, { Component, PropTypes } from "react";

export default class ControlForm extends Component {

  render() {
    return (
      <form className="controlForm">
        <input
          type="number"
          placeholder="Grid size"
          value={this.props.size}
          onChange={e => this.props.onSizeChange(+e.target.value)}
        />
      </form>
    );
  }
}

ControlForm.propTypes = {
  onSizeChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};
