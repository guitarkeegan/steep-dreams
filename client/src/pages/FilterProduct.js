import React, { useState, useEffect } from "react";
// put in links to render and map through products
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS ,QUERY_PRODUCT_BY_NAME} from "../utils/queries";
import Card from "../components/Card";
import calculateCount from "../utils/helpers";
import { getSavedProductIds } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap/";


const FilterProduct = ({ savedProducts, setSavedProducts }) => {
  
    const {productName}=useParams();

    
  
    const { loading, data } = useQuery(QUERY_PRODUCT_BY_NAME,{

  
    // pass URL parameter
    variables: { name: productName},
  
  });
  const searchProduct = data?.getProductByName || [];

  const products=[searchProduct];


  const [addNotification, setAddNotification] = useState(false)

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
      zIndex: 2
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

    <div className="wrapper pt-4">


    {addNotification ? renderProductsAdded() : <></>}

     
        {products.map((product, index) => (
          <div className="row text-center justify-content-center align-items-center m-5 py-5">
          <div key={index} className="col-lg-4 col-md-6 col-sm-8 col-xs-12">
            <Card key={product._id} addToCart={addToCart} product={product} />
          </div>
          </div>
        ))}
      
    </div>
  );
};

export default FilterProduct;
