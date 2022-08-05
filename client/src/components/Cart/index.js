import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Icon } from '@iconify/react';
import {getSavedOrderIds, removeOrderId} from '../../utils/localStorage'

function Cart() {
  const [show, setShow] = useState(false);
  const [savedOrderIds, setSavedOrderIds] = useState(getSavedOrderIds());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, data } = useQuery(QUERY_ME);
  
  const products = data?.me || [];

  // if (!products.length) {
  //   return <h3>No item available</h3>;
  // }

  // console.log("Products: " + JSON.parse(products))
console.log("Products" + products);
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
            <p>Order</p>
          )}
          {products ?
          products.map(product=>{
            <div key={product.id}>
              <h3><img src={require(`../../images/${product.image}`)}></img>  {product.name}</h3>
              <p>Price: {product.price}</p>
              <Button className="btn btn-danger">Delete</Button>
            </div>
          }) :
           <p>No Items in Cart.</p>
          }
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
