import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import Products from "./Products";
// useing query to render products
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <img
        className="hero"
        src="https://images.pexels.com/photos/6713241/pexels-photo-6713241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ></img>
      <div className="row text-center mt-3 mb-3">
       
            <Link className="col-12 col-md-6 mt-2 mb-2" to="/about">
              
                <h2 className="home-card-text">About Us</h2>
                <img 
                  className="home-card img-fluid "
                  src="https://images.pexels.com/photos/3971929/pexels-photo-3971929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                ></img>
              
            </Link>

            <Link className="col-12 col-md-6 mt-2 mb-2" to="/Products">
              
                <h2 className="home-card-text">Products</h2>
                <img
                  className="home-card img-fluid"
                  src="https://images.pexels.com/photos/6465733/pexels-photo-6465733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                ></img>
        
            </Link>

          
        </div>
      
    </main>
  );
};

export default Home;
