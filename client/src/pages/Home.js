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

      <div className="m-5 ">
        <ul className="home-card-text d-flex text-center">
          <Link className="" to="/about">
            <li className="container click" href="#about">
              <h2 className="">Products</h2>
              <img
                className="home-card "
                src="https://images.pexels.com/photos/6713241/pexels-photo-6713241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              ></img>
            </li>
          </Link>
          <Link className="" to="/Products">
            <li className="container click">
              <h2 className="">Products</h2>
              <img
                className="home-card"
                src="https://images.pexels.com/photos/6713241/pexels-photo-6713241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              ></img>
            </li>
          </Link>
        </ul>
      </div>
    </main>
  );
};

export default Home;
