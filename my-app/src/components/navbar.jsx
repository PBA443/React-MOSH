import React from "react";

/* class NavBar extends Component {
  state = {};
  render() {
    return (
    );
  }
}

export default NavBar; */

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>{" "}
      </span>
    </nav>
  );
};

export default NavBar;
