import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <ul>
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>

        <Link className="navbar-brand" to="/movies">
          Movies
        </Link>

        <Link className="navbar-brand" to="/customers">
          Customers
        </Link>

        <Link className="navbar-brand" to="/rentals">
          Rentals
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
