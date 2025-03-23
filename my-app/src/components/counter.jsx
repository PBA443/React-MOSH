import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-2">
                <span className="badge bg-warning text-dark">
                  {this.formatCount()}
                </span>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary m-1"
                  onClick={() => this.props.onIncrement(this.props.counter)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-secondary m-1"
                  disabled={this.props.counter.value === 0 ? "disabled" : ""}
                  onClick={() => this.props.onDecrement(this.props.counter)}
                >
                  -
                </button>
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  onClick={() => this.props.onDelete(this.props.counter.id)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "OhMyGod" : value;
  }
}

export default Counter;
