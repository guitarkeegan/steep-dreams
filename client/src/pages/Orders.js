import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";

//Calculate count/quantity for products in each order
//NOTE:This is different from helper calculate Method ,as helper method takes an array of product id
//and this array holds object of product details

function calculateCount(productObjects, quantity) {
  for (let product of productObjects) {
    if (quantity[product._id]) {
      quantity[product._id] += 1;
    } else {
      quantity[product._id] = 1;
    }
  }
}

/*

Order Page displayed only when user is logged in
Display all the orders of a user and display the order details

*/

const Orders = () => {
  const { loading, data } = useQuery(QUERY_ME);

  //To hold the quantity of products in each order
  let quantity = {};

  // //To hold the productId's to check of there is repeated products in the same order
  let productIds = [];

  //Get the Orders from the result of QUERy_ME
  const orders = data?.me.orders || [];
  const products = orders.productDetails;

  //If Order array is empty return h3 element
  if (!orders.length) {
    return <h3>No Order Available</h3>;
  }

  return (
    <main className="my-4 container mw-100">
      <h3>Order Summary</h3>
      <div className="row my-4 align-items-center justify-content-center">
        {orders.map((order, index) => {
          //If order gets inserted with no products(incase from backend)

          let productIds = [];
          let quantity = {};

          calculateCount(order.productDetails, quantity);

          if (order.productDetails.length === 0) {
            return <p>No products Added to this Order</p>;
          } else {
            return (
              <div className="card ordersummary">
                <div className="row d-flex justify-content-between align-items-center p-2">
                  <p className="col-lg-4 col-md-4 col-sm-4 col-4">Order No {index + 1}</p>
                  <p className="col-lg-4 col-md-4 col-sm-4 col-4">
                    Total Price {order.totalPrice.toFixed(2)}
                  </p>
                  <p className="col-lg-4 col-md-4 col-sm-4 col-4">Created Date {order.createdAt}</p>
                </div>

                <ul className="list-group list-group-flush">
                  <div className="row d-flex justify-content-between align-items-center p-3">
                    <p className="col-lg-3 col-md-3 col-sm-3 col-3">Image</p>
                    <p className="col-lg-3 col-md-3 col-sm-3 col-3">Product</p>
                    <p className="col-lg-3 col-md-3 col-sm-3 col-3">Price</p>
                    <p className="col-lg-3 col-md-3 col-sm-3 col-3">Qty</p>
                  </div>
                  <hr />

                  {/* Loop  through each product per order,calculate quantity as count and display only unique products */}
                  {order.productDetails.map((product, index, array) => {
                    if (productIds.indexOf(product._id) == -1) {
                      productIds.push(product._id);

                      return (
                        <li
                          key={product._id}
                          className="row list-group-item order-productlist d-flex justify-content-between  align-items-center px-3"
                        >
                          <img
                            src={require(`../images/${product.image}`)}
                            className="col-lg-3 col-md-3 col-sm-3 col-12"
                          />
                          <p className="product-name col-lg-3 col-md-3 col-sm-3 col-12">{product.name}</p>
                          <p className="product-price col-lg-3 col-md-3 col-sm-3 col-12">{product.price}</p>
                          <p className="product-quantity col-lg-3 col-md-3 col-sm-3 col-12">
                            {quantity[product._id]}
                          </p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          }
        })}
      </div>
    </main>
  );
};

export default Orders;
