import React, { Component, PropTypes } from "react";

export default class ControlForm extends Component {

  handleChange() {
    this.props.onSizeChange(this.refs.size);
  }

  render() {
    return (
      <form className="controlForm">
        <input
          type="number"
          placeholder="Grid size"
          value={this.props.size}
          ref="size"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

ControlForm.propTypes = {
  onSizeChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};
