import React, {useState, useEffect} from "react";
// put in links to render and map through products
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {QUERY_PRODUCTS} from "../utils/queries";
import Card from "../components/Card"
// import "bootstrap/dist/css/bootstrap.min.css";
// import { saveOrderIds } from "../utils/localStorage";

const Products = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.getProducts || [];
 

  const [savedProducts, setSavedProducts] = useState([])

  useEffect(() => {
    console.log(savedProducts)
    localStorage.setItem('saved_products', JSON.stringify(savedProducts));
  }, [savedProducts])
  

  const addToCart = (id) => {
    console.log(id)
    // setSavedProduct()
    setSavedProducts([...savedProducts, id]);
    
    
  }

  if (!products.length) {
    return <h3>No item available</h3>;
  }

  return(<div className="wrapper">
    <ul>
      {products.map((product, index) => 

          <li key={index} className="cardList productList">
            <Card key={product._id} addToCart={addToCart}  product={product}/>
          </li> 
      )
      }
    </ul>
</div>);
};


export default Products;


