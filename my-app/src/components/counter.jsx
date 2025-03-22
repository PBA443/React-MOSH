import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
  };

  handleIncrement = (product) => {
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <span className="badge badge-warning m-2">{this.formatCount()}</span>
        <button onClick={() => this.handleIncrement({ id: 1 })}>
          Increment
        </button>
      </div>
    );
  }
  formatCount() {
    return this.state.count === 0 ? "OhMyGod" : this.state.count;
  }
}

export default Counter;
