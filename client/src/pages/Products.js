import React, { useState, useEffect } from "react";
// put in links to render and map through products
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import Card from "../components/Card";
import calculateCount from "../utils/helpers";
import { getSavedProductIds } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap/";

const Products = ({ savedProducts, setSavedProducts }) => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.getProducts || [];

  //To Fetch the searchText
  // const { searchValue } = props.match.params();
  // console.log("Search Value",searchValue);

  //Alternative to Params
  //  const searchValue=JSON.parse(localStorage.getItem("search_value"));
  //  console.log(searchValue);

  //Fetches the saveProducts from localstorage if any everytime page gets refreshed and set it as state variable
  // const productIds=getSavedProductIds();
  // const [savedProducts, setSavedProducts] = useState(productIds);

  //Everytime the state variable changes localstorage gets updated with the value
  // useEffect(() => {

  //   localStorage.setItem('saved_products', JSON.stringify(savedProducts));
  const [addNotification, setAddNotification] = useState(false)
  // }, [savedProducts])
  const styles = {
    addProduct: {
      backgroundColor: "rgb(36, 22, 4)",
      position: "fixed",
      top: 40,
      right: 40,
      width: "200px",
      borderRadius: "4px",
      color: "#fff",
      fontFamily: "Robato 'Open Sans'",
      
    }
  };

  const renderProductsAdded = () => {
    return (
      <Container style={styles.addProduct} className="text-center p-4">
        <div>
          <h2>🫖🫖🫖</h2>
        </div>
        <div>
          <p>Item added to cart!</p>
        </div>
      </Container>
    );
  };

  //Adds the product id to the state array variable and to localstorage
  const addToCart = (id) => {
    setSavedProducts([...savedProducts, id]);
    localStorage.setItem("saved_products", JSON.stringify(savedProducts));

    //Need to Change the alert to a better option
    setAddNotification(true)
    setTimeout(()=>{
      setAddNotification(false)
    }, 1500)
  };

  if (!products.length) {
    return <h3>No item available</h3>;
  }

  return (

    <div className="wrapper ">


    {addNotification ? renderProductsAdded() : <></>}

      <ul className="list-group ulCards">
        {products.map((product, index) => (
          <li key={index} className="cardList productList">
            <Card key={product._id} addToCart={addToCart} product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
