import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_ME } from "../../utils/queries";
import Products from "../../pages/Products";
import { useQuery } from "@apollo/client";
import { Icon } from '@iconify/react';

function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, data } = useQuery(QUERY_ME);
  
  const products = data?.me || [];

  console.log(products);

  return (
    <>
      <Button
        onClick={handleShow}
        className="btn btn-lg btn-light m-2"
        to="/cart"
      >
        <Icon icon="entypo:shopping-cart"></Icon>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            
            <div>
              <h3>{products}</h3>
            </div>

          )}
          Items
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
