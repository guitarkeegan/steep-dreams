import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Icon } from '@iconify/react';
import {getSavedProductIds} from '../../utils/localStorage'
import Auth from '../../utils/auth';
import calculateCount from "../../utils/helpers";

export default function Cart() {
  const [show, setShow] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());
  const [count, setCount] = useState({});
  // const savedProductIds = JSON.parse(localStorage.getItem("saved_products"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(typeof savedProductIds);
  // console.log(savedProductIds);

  // if (savedProductIds.length !== 0){
  //   const quantity = calculateCount(savedProductIds, {})
  //   console.log("quantity", quantity)
  // }
  
  // console.log("calculateCount", count)
  console.log("spid", savedProductIds)
  


  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const productData = data?.getProducts || [];
  console.log("projectData", productData);

  let quantity;
  if (savedProductIds.length !== 0){
    console.log(savedProductIds);
    quantity = calculateCount(savedProductIds, count)
    // setCount(...count, calculateCount(savedProductIds, count))
    console.log("quantity", quantity)
  }

  
  const uniqueProductIds = new Set(savedProductIds) 
  
  const handleDeleteOrder = () => {
    return;
  }

  const createOrder = () => {
    return;
  }


  // productData.map(product=>{
  //   if (uniqueProductIds.has(product._id)){
  //     console.log(product.name)
  //     console.log(product.description)
  //     console.log(product.image)
  //     console.log(product.price)
  //     console.log(count[product._id])
  //   }
  // })

  // const handleDeleteOrder = async (orderId) => {
  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }
  // }

  //   try {
  //     const { data } = await removeOrderId({
  //       variables: { orderId },
  //     });

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

         {productData.map(product=>{
          if (uniqueProductIds.has(product._id)){
            return(<div key={product.id}>
              <h3><img src={require(`../../images/${product.image}`)} />  {product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Count: {quantity[product._id]}</p>
              <Button onClick={() => handleDeleteOrder} className="btn btn-danger">Delete</Button>
            </div>)}
          })}
          <Button onClick={() => createOrder}>Submit Order</Button>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
        }