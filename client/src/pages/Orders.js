import React,{useState} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PRODUCTS } from "../utils/queries";
// useing query to render products
import 'bootstrap/dist/css/bootstrap.min.css';
const Orders = () => {

  const {loading,data} = useQuery(QUERY_ME);
  
  const count={};
  const productIds=[];

  console.log("Orders Page");

  // console.log(data?.me);

  const orders=data?.me.orders || []

  const products=orders.productDetails

  // console.log(orders);

  if (!orders.length) {
    return <h3>No Order Available</h3>;
  }

  //Calculate the Quantity of a product in every order
 for(const eachOrder of orders){
    for(const product of eachOrder.productDetails){
     
      if(count[product._id]){

        count[product._id]+=1;
      }
      else{
        count[product._id]=1;
      }


    }


 }
 var duplicateFlag=false;

  console.log("Count",{...count});

  // console.log(...orders);

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

           
        
          

          { order.productDetails.map((product,index,array)=>
             
         {
          console.log(productIds);
          console.log(productIds.indexOf(product._id));
          console.log(product._id);
            if(productIds.indexOf(product._id)==-1){
              productIds.push(product._id)
            //To Do To display the quantity for repeated entries
            //Test by adding multiple products into the page
           return( <li key={product._id} className="list-group-item order-productlist d-flex justify-content-between">
              <img src={require( `../images/${product.image}`)}/>
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
              <p className="product-quantity">{count[product._id]}</p>
            </li>)
            
            }
           
          
          }
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