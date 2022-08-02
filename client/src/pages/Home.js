import React from "react";
import { useQuery } from "@apollo/client";
import Products from "../components/Products";
// useing query to render products

const Home = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

  return (
    <main>
      <div className="col-12 col-md-8 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Products products={products} title="Steeping some teas for you..." />
        )}
      </div>
    </main>
  );
};

export default Home;
