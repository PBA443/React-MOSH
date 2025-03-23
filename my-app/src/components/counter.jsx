import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <span className="badge bg-warning text-dark">{this.formatCount()}</span>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "OhMyGod" : value;
  }
}

export default Counter;
