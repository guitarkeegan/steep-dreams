import React from "react";
import { Link } from "react-router-dom";
import Cart from '../Cart'

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    
    <header className="text-light mb-5 py-1 flex-row align-center">

      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Steep Dreams</h1>
          </Link>
        </div>
        <div>
        <Link className="btn btn-lg btn-info m-2" to="/about">
          About
        </Link>
        <Link className="btn btn-lg btn-info m-2" to="/products">
          Our Products
        </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.email}
              </Link>
              <Cart />
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
