import React from "react";
// put in links to render and map through products
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {QUERY_PRODUCTS} from "../utils/queries";
import Card from "../components/Card"
// import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({
  //tea product details
  
}) => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(data);
  const products = data?.getProducts || [];
  if (!products.length) {
    return <h3>No item available</h3>;
  }

  return(<div className="wrapper">
    <ul>
      {products.map(product => {
         
        return(
          <li className="cardList" >
            
                 <Card product={product}/>
                </li>
              
        )
      })}
    </ul>
</div>);
};

// function Card(){
//   return(
//     <div className="card">
//       <div className="cardBody">
//         <img src={products.image}/>
//         <h2 className="cardTitle">{products.name}</h2>
//         <p className="cardDescription">{products.description}</p>
//         <h3 className="cardPrice">${products.price}</h3>
//       </div>
//       <button ClassName="cardButton">Order</button>
//     </div>
//   )
// }

export default Products;


{/* <div className="flex-row justify-space-between my-4">
        {products &&
          products.map(() => (
            // <div key={skill} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  
                </h4>
              </div>
            
          ))}
      </div> */}
