import React from "react";
import { Link } from "react-router-dom";
const NavBar = ({ user }) => {
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
        {!user && (
          <>
            <Link className="navbar-brand" to="/login">
              Login
            </Link>
            <Link className="navbar-brand" to="/register">
              Register
            </Link>
          </>
        )}
        {user && (
          <>
            <Link className="navbar-brand" to="/profile">
              {user.name}
            </Link>
            <Link className="navbar-brand" to="/logout">
              Logout
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
