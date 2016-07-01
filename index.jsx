import React, { Component, PropTypes } from "react";

/**
 * Component that replicates the HTML5 number input
 *
 * @usage
 * <NumberInput
 *   id="guests"
 *   min={0}
 *   max={10}
 *   value={2}
 * />
 */
class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.setValue = this.setValue.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  setValue() {
    return this.state.value ? parseInt(this.state.value, 10) : 0;
  }

  handleKeyDown(event) {
    const whitelistKeyCodes = [
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // 0 - 9
      37, 39, // left arrow, right arrow
      8, 9, 46, // backspace, tab, delete
      91, 93, // command
      13, 17, 16, 18, // enter, ctrl, shift, alt
      27, // esc
    ];

    if (whitelistKeyCodes.indexOf(event.keyCode) === -1) {
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      this.increment();
    }

    if (event.keyCode === 40) {
      this.decrement();
    }
  }

  handleChange(event) {
    let value;

    if (event.target.value) {
      value = parseInt(event.target.value, 10);
    } else {
      value = "";
    }

    this.setState({
      value,
    });
  }

  increment(event) {
    const value = this.setValue();

    if (!value) {
      this.setState({
        value: this.props.min,
      });
    }

    if (value !== this.props.max && this.state.value < this.props.max) {
      this.setState({
        value: (value + 1),
      });
    }

    if (this.state.value < this.props.min) {
      this.setState({
        value: this.props.min,
      });
    }

    if (event) {
      event.preventDefault();
    }
  }

  decrement(event) {
    const value = this.setValue();

    if (!value) {
      this.setState({
        value: this.props.min,
      });
    }

    if (value !== this.props.min && this.state.value > this.props.min) {
      this.setState({
        value: (value - 1),
      });
    }

    if (this.state.value > this.props.max) {
      this.setState({
        value: this.props.max,
      });
    }

    if (event) {
      event.preventDefault();
    }
  }

  render() {
    const {
      id,
      name,
      min,
      max,
      placeholder,
      required,
    } = this.props;

    const props = {};

    props.placeholder = placeholder || null;
    props.required = required || null;
    props.min = min || null;
    props.max = max || null;

    return (
      <div
        className="NumberInput"
        style={{}}
      >
        <input
          id={id}
          name={name || id}
          type="text",
          value={this.state.value}
          style={{}}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          {...props}
        />

        <button
          style={{}}
          onClick={this.increment}
          type="button"
          key="plus"
        >
          <Icon name="plus" />
        </button>

        <button
          style={{}}
          onClick={this.decrement}
          type="button"
          key="minus"
        >
          <Icon name="minus" />
        </button>
      </div>
    );
  }
}

NumberInput.propTypes = {
  id: React.PropTypes.string.isRequired,

  name: React.PropTypes.string,

  value: React.PropTypes.number,

  min: React.PropTypes.number,

  max: React.PropTypes.number,

  placeholder: React.PropTypes.string,

  required: React.PropTypes.bool,
};

NumberInput.defaultProps = {
  id: "",

  name: "",

  value: null,

  min: 0,

  max: 100,

  placeholder: "",

  required: false,
};

export default NumberInput;
