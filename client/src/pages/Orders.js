import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PRODUCTS } from "../utils/queries";
// useing query to render products
import 'bootstrap/dist/css/bootstrap.min.css';
const Orders = () => {

  const {loading,data} = useQuery(QUERY_ME);
  console.log("Orders Page");

  console.log(data?.me);

  const orders=data?.me.orders || []

  console.log(orders);

  if (!orders.length) {
    return <h3>No Order Available</h3>;
  }

  console.log(...orders);

  return (
    <main>
      <div className="row">
        {
        orders.map((order)=>

          <div className="card">
            <div className="card-header d-flex justify-content-between px-2">
              <div>Order No #</div>
              <div>{order.createdAt}</div>
            </div>
            
          <ul className="list-group list-group-flush">

           {
           order.productDetails.map(product=>
             
            //To Do To display the quantity for repeated entries
            //Test by adding multiple products into the page
            <li className="list-group-item order-productlist d-flex justify-content-between">
              <img src={require( `../images/${product.image}`)}/>
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
              <p className="product-quantity">To calculate</p>
            </li>

           )
           
           }
           </ul>

          </div>
        )
        }
      </div>
    </main>
  );
};

export default Orders;