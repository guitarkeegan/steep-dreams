import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import Products from "./Products";
// useing query to render products

const Home = () => {
  return (
    <main>
              <img className = "hero" src="https://images.pexels.com/photos/6713241/pexels-photo-6713241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>

      <div className="col-12 col-md-8 mb-3">
        {/* {loading ? (
          <div>Loading...</div>
        ) : (
          <Products products={products} title="Steeping some teas for you..." />
        )} */}
        Home
      </div>
    </main>
  );
};

export default Home;
