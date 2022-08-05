import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import Products from "./Products";
// useing query to render products

const Home = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(data);
  const products = data?.getProducts || [];

  return (
    <main>
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
