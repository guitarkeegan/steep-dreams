import React from "react";
import { Link } from "react-router-dom";
import Cart from '../Cart'
import { Icon } from '@iconify/react';
import Products from '../../pages/Products'
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";

const Header = ({savedProductIds, savedProducts, setSavedProducts}) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (


    <header className=" d-flex justify-content-around align-items-center py-5" >

      <div className="container">
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          <div className="d-flex justify-content-start align-items-center px-3 mx-1 my-2">
          <Link className="text-light" to="/">
            <h1 className="logo">Steep Dreams <Icon icon="icon-park-solid:tea-drink"></Icon></h1>
          </Link>
        </div>
        <div className="d-flex justify-content-start align-items-center ml-2 my-2">
        <SearchBar/>
        </div>
        <div className="d-flex justify-content-start align-items-center px-3 my-2">
       
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
              <Cart savedProductIds={savedProductIds} savedProducts={savedProducts} setSavedProducts={setSavedProducts}/>
              <Link to="" onClick={logout}>
              <Icon icon="clarity:logout-solid" className="nav-icon"></Icon>
              </Link>
              {/* <Link className="" to="/me"> */}
              <span className="px-2 profile-name">
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
