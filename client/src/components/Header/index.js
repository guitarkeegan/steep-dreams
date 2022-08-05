import React from "react";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="mb-5 align-center py-3" >
      <div className="container justify-space-between-lg">
        <div className="d-flex  justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center">
          <Link className="text-light" to="/">
            <h1 className="">Steep Dreams <Icon icon="icon-park-solid:tea-drink"></Icon></h1>
          </Link>
        </div>
        <div className="d-flex justify-content-start align-items-center p-4">
        <Link className="" to="/about">
          Our Story
        </Link>
        <Link className="" to="/products">
          Products
        </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/me">
                {Auth.getProfile().data.email}
              </Link>
              <Link className="" to="/cart">
                <Icon icon="entypo:shopping-cart"></Icon>
              </Link>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
