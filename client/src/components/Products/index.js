import React from "react";
// put in links to render and map through products
// import { Link } from "react-router-dom";

const ProductList = ({
  //tea product details
  name,
  title,
  img,
}) => {
  if (!name.length) {
    return <h3>No item available</h3>;
  }

  retrun(<div>{showTitle}</div>);
};

export default ProductList;
