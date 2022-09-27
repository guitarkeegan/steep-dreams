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
    <>
    <div className="text-center py-2 announcement-header"><h6>Steep Dreams Launcing online on September 25th 2022</h6></div>
    <Navbar bg="light" expand="lg" className="header py-3 mb-3">
      <Container className="d-flex flex-column py-3">
      <Link className="text-light d-flex justify-content-center align-items-center" to="/">
        <img src={require( `../../images/steep-dreams.png`)} className="logo"/>
        <h1 className=" logo-header mx-5">Steep Dreams</h1>
      </Link>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-between align-items-center px-5">
            <SearchBar />
            <div className="d-flex  justify-content-center align-items-center">    
            <Link className="nav" to="/about">
               Our Story
            </Link>
            <Link className="nav" to="/products">
               Products
            </Link>
            </div>  
            <div className="d-flex justify-content-end align-items-center">
            {Auth.loggedIn() ? (
            <>
            <Link className="nav" to="/orders">
               My Orders
            </Link>
            <div>
              <Cart savedProductIds={savedProductIds} savedProducts={savedProducts} setSavedProducts={setSavedProducts}/>
              <Link to="" onClick={logout}>
              <Icon icon="clarity:logout-solid" className="nav-icon"></Icon>
              </Link>
              <span className="px-2 profile-name">
                Welcome {Auth.getProfile().data.email.split('@')[0] }  !!
              </span>  
              </div>
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

          </Nav>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    </>
  );
}


export default Header;
