import React,{useState} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME} from "../utils/queries";
import 'bootstrap/dist/css/bootstrap.min.css';
import calculateCount from '../utils/helpers'

//Calculate count for products in each order
// function calculateCount(productArray,count){
  
//  for(let product of productArray){
//   if(count[product._id])
// {count[product._id]+=1;}
// else{
//   count[product._id]=1;
// }

//  }
  


// }

const Orders = () => {

  const {loading,data} = useQuery(QUERY_ME);
  
  //To hold the quantity of products in each order
  let count={};

  //To hold the productId's to check of there is repeated products in the same order 
  let productIds=[];


  const orders=data?.me.orders || []

  const products=orders.productDetails

  
//If Order array is empty return h3 element
  if (!orders.length) {
    return <h3>No Order Available</h3>;
  }


  return (
    <main>
      <div className="row">
        {
        orders.map((order,index)=>{

          //Reset count and productId for each order
          count={};
          productIds=[];

         //If order gets inserted with no products
          if(order.productDetails.length===0){
             return <p>No products Added to this Order</p>
          }
       
        else{
    
    return (
            <div className="card">
                <div className=" d-flex justify-content-between align-items-center p-2">
                  <div>Order No {index+1}</div>
                  <div>Total Price {order.totalPrice}</div>
                  <div>{order.createdAt}</div>
                </div>

                <ul className="list-group list-group-flush">
                <div className=" d-flex justify-content-between align-items-center p-2">
                  <div>Image</div>
                  <div>Product</div>
                  <div>Price</div>
                  <div>Qty</div>
                </div>
                <hr/>
                  {/* Loop  through each product per order,calculate quantity as count and display only unique products */}
                  { order.productDetails.map((product,index,array)=>
                  {
                    calculateCount(array,count);
                       
                  if(productIds.indexOf(product._id)==-1){
                    productIds.push(product._id)
                    
                    return( <li key={product._id} className="list-group-item order-productlist d-flex justify-content-between  align-items-center">
                            <img src={require( `../images/${product.image}`)}/>
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">{product.price}</p>
                             <p className="product-quantity">{count[product._id]}</p>
                            </li>)
          }
          })}
          </ul>
    </div>)

}})
}
      </div>
    </main>
  );
};

export default Orders;