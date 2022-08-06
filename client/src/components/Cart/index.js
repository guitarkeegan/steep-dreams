import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Icon } from '@iconify/react';
// import {getSavedOrderIds, removeOrderId} from '../../utils/localStorage'
import Auth from '../../utils/auth';

export default function Cart() {
  const [show, setShow] = useState(false);
  // const [savedOrderIds, setSavedOrderIds] = useState(getSavedOrderIds());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { _id: savedOrderIds[0] }
  });
  const userData = data?.getProduct || {};
  console.log(userData);

  const handleDeleteOrder = async (orderId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
  }

    // try {
    //   const { data } = await removeOrderId({
    //     variables: { orderId },
    //   });

  //     // upon success, remove order's id from localStorage
  //     removeOrderId(orderId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


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

          {/* {savedOrderIds ?
          savedOrderIds.map(product=>{
            <div key={product.id}>
              <h3><img src={require(`../../images/${product.image}`)}></img>  {product.name}</h3>
              <p>Price: {product.price}</p>
              <Button onClick={() => handleDeleteOrder} className="btn btn-danger">Delete</Button>
            </div>
          }): */}
            
           <p>No Items in Cart.</p>
          {/* } */}
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
        }