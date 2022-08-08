import React from "react";
import { Link } from "react-router-dom";
import Cart from '../Cart'
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
            <h1 className="logo">Steep Dreams <Icon icon="icon-park-solid:tea-drink"></Icon></h1>
          </Link>
          <span className="px-3 search-bar">Search Bar Placeholder</span>  
        </div>
        <div className="d-flex justify-content-start align-items-center p-4">
       
        <Link className="nav" to="/about">
          Our Story
        </Link>
        <Link className="nav" to="/products">
          Products
        </Link>
          {Auth.loggedIn() ? (
            <>
            <Link className="nav" to="/orders">
                My Orders
              </Link>
              <Cart />
              <Link to="" onClick={logout}>
              <Icon icon="clarity:logout-solid" className="nav-icon"></Icon>
              </Link>
              {/* <Link className="" to="/me"> */}
              <span className="px-3 profile-name">
                Welcome {Auth.getProfile().data.email.split('@')[0] }  !!
              </span>  
              {/* </Link> */}
            </>
          ) : (
            <>
              <Link className="nav" to="/login">
                Login
              </Link>
              <Link className="nav" to="/signup">
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
