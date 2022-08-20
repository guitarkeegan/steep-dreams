import React from "react";
import { Link } from "react-router-dom";
import Cart from '../Cart'
import { Icon } from '@iconify/react';
import Products from '../../pages/Products'
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({savedProductIds, savedProducts, setSavedProducts}) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (

    <Navbar bg="light" expand="lg" className="header py-5 mb-3">
      <Container>
      <Link className="text-light" to="/">
            <h1 className="logo">Steep Dreams <Icon icon="icon-park-solid:tea-drink"></Icon></h1>
          </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <SearchBar />
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;
