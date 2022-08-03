import React from "react";
// put in links to render and map through products
import { Link } from "react-router-dom";

const ProductList = ({
  //tea product details
  products
}) => {
  console.log(products)
  if (!products.length) {
    return <h3>No item available</h3>;
  }

  return(<div>Products exist</div>);
};

export default ProductList;
