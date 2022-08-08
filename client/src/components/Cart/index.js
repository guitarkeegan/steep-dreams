import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { CREATE_ORDER } from "../../utils/mutations";
import { useQuery,useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import Auth from "../../utils/auth";
import calculateCount from "../../utils/helpers";

export default function Cart({
  savedProducts,
  setSavedProducts,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const productData = data?.getProducts || [];

  const [addOrder, { error }] = useMutation(CREATE_ORDER);
 
  let totalPrice=0;


  //Quantity  and calculateCount helper method to count same products in the cart
  let quantity = {};
  if (savedProducts.length !== 0) {
    quantity = calculateCount(savedProducts, quantity);
  }

  //Hold uniqueset of productid to display only unique products in cart
  const uniqueProductIds = new Set(savedProducts);


  /* 
  Place Order Handler
  Create an Order entry in DB
  Send Out Email Notification on Order
  */
  const placeOrderHandler = async () => {
   
    //Get Total Price and Array of ProductIDs
    
   
try{
    const  {data}  = await addOrder({
      variables: { totalPrice:totalPrice ,productDetails:[...savedProducts]},
    });

  
    // const userData=data?.createOrder || [];
    const userData=data?.createOrder;
    console.log(userData.email);

    if(userData){

      //Sending Order Notification

      //Send email using Elastic Email API and SMTP js Library
      //Below code rely on the /public/smtp.js file
      //Commenting the email notification 

      
        // window.Email.send({

        //   Host:"smtp.elasticemail.com",
        //   Username:"simmyvarghese5@gmail.com",
        //   Password:"12F322DE9F3F58C7B02254666F8AE442F4DA",
        //   To:userData.email,
        //   From:"simmyvarghese5@gmail.com",
        //   Subject:"Order Notifcation from SteepDreams",
        //   Body:`
        //   <div">
        //   Hello ${userData.email.split('@')[0]},
        //   <br>
        //   <br>
        //   Thanks for shopping with us.
        //   <br>
        //   Please login to see Your <a href="http://localhost:3000/orders">Order Details </a>
        //   <br>
        //   <br>
        //   Have a Steep  Dreams  !!
        //   <br>
        //   From Steep Dreams Team
        //   </div>`
        // })
        // .then((res)=>console.log("Email Sent Successfully",res))
        // .catch(err=>console.log(err));
      
        //Remove from Local Storage
        localStorage.removeItem("saved_products");

      //Navigate To payment page

      window.location.assign('/payment');
      
    }

    

  }catch(error){
    console.log(error);
  }
   
  };


  // Pass productId that will be deleted from local storage and state. 

  const deleteFromState = (productId) => {
    // make a copy of savedProducts state variable
    const currentSavedProducts = [...savedProducts]
    // validate whether or not there are saved products.
    if (savedProducts.length === 0) {
      return;
    }
    // counter so that only one product matching the productId is deleted.
    let deleteCount = 0;
    // this will be the updated savedProducts variable.
    const updatedSavedProductIds = [];
    // iterate through current saved products. For the first match, we will not push it to the updatedSavedProducts, and instead will increment the deleteCount. Otherwise, we push to the updatedSavedProductId array.
    currentSavedProducts.forEach((pId) => {
      if (productId === pId && deleteCount === 0) {
        deleteCount++;
      } else {
        updatedSavedProductIds.push(pId);
      }
      // update the state variable.
      setSavedProducts(updatedSavedProductIds);
    });
  };

  // varify that the user is logged in and that the quantity is greater than 1. If it is, remove from state and local storage, then decrement the quantity[productId] by one. Otherwise, remove from state and local storage. Either way, we will then update the UI with renderCartBody().


  //Delete Product Handler
  const handleDeleteProduct = async (productId) => {
  

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (quantity[productId] > 1) {
      quantity[productId]--;
      deleteFromState(productId);
      renderCartBody();
      console.log(quantity[productId]);
      return;

    } else {

      try {

        deleteFromState(productId);
        renderCartBody();

      } catch (err) {
        console.error(err);
      }
    }
  };

// Use this to update the UI after any deletions. We will map through all productIds in the database, then render the fields to the body of the 'off canvas' body. 

  const renderCartBody = () => {
   return (
    productData ?
      (<>
        {productData.map((product) => {
          if (uniqueProductIds.has(product._id)) {
            totalPrice+=(product.price*quantity[product._id]);
            return (
              <div key={product._id}>
                <h3>
                  <img
                    src={require(`../../images/${product.image}`)}
                    className="product-cart-image"
                  />{" "}
                  {product.name}
                </h3>
                <p>Price: {product.price}</p>
                <p>Count: {quantity[product._id]}</p>
                <Button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn btn-danger"
                >
                  Delete
                </Button>
              </div>
            );
          }
        })}
        <hr/>
        <p>Total Price: {totalPrice.toFixed(2)}</p>
        <Button className="my-4 w-100" onClick={() => placeOrderHandler()}>
          Place Order
        </Button>
        
      </>)
      :
      <div>Cart is Empty</div>
    ) 
  }
// The button and off canvas component. Will conditionally render with renderCartBody() if there are saved products, or else it will say 'Cart is Empty'. 
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
          {uniqueProductIds.length !== 0 ? renderCartBody(): (
            <p className="bg-primary">Cart is Empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
