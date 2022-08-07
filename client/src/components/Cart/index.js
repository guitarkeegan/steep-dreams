import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Icon } from '@iconify/react';
import {getSavedProductIds, removeProductId} from '../../utils/localStorage'
import Auth from '../../utils/auth';
import calculateCount from "../../utils/helpers";

export default function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  


  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const productData = data?.getProducts || [];
  const savedProductIds = getSavedProductIds();

  //Quantity  and calculateCount helper method to count  same products in the cart
  let quantity={};
  if (savedProductIds.length !== 0){

     quantity = calculateCount(savedProductIds, quantity)

  }

  //Hold uniqueset of productid to display only unique products in cart
  const uniqueProductIds = new Set(savedProductIds) 

  const createOrder = () => {
    return;
  }

  const handleDeleteProduct = async (productId) => {
    // get token
    
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }
    
    if (quantity[productId] > 1){
      quantity[productId]--;
      console.log(quantity[productId]);
      return;
    } else {
      try {
        // upon success, remove order's id from localStorage
        removeProductId(productId);
      } catch (err) {
        console.error(err);
      }
    };
    }




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
       
         {
         uniqueProductIds.length!==0 
         ?
         (
          <>
          {
          productData.map(product=>{
          if (uniqueProductIds.has(product._id)){

            return(<div key={product.id}>
              <h3><img src={require(`../../images/${product.image}`)} className="product-cart-image" /> {product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Count: {quantity[product._id]}</p>
              <Button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger">Delete</Button>
            </div>)
          }
          })
        }
          <Button className="my-4 w-100" onClick={()=>createOrder}>Place Order</Button>
          </>
          )
          :(<p className="bg-primary">Cart is Empty</p>)
          }
        
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
        }