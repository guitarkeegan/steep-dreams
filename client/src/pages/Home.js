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

      {/* <div className="col-12 col-md-8 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Products products={products} title="Steeping some teas for you..." />
        )}
       
      </div> */}
      <div className="row m-5 justify-content-center align-item-center col-11">
       
          <ul className="row text-center ">

            <Link className="homelist col-md-6 col-10" to="/about">
              <li className="container click mb-3 " href="#about">
                <h2 className="home-card-text">About Us</h2>
                <img 
                  className="home-card img-fluid "
                  src="https://images.pexels.com/photos/3971929/pexels-photo-3971929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                ></img>
              </li>
            </Link>

            <Link className="homelist col-md-6 col-10" to="/Products">
              <li className="container click">
                <h2 className="home-card-text">Products</h2>
                <img
                  className="home-card img-fluid"
                  src="https://images.pexels.com/photos/6465733/pexels-photo-6465733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                ></img>
              </li>
            </Link>

          </ul>
        </div>
      
    </main>
  );
};

export default Home;
