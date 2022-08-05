import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PRODUCTS } from "../utils/queries";
// useing query to render products

const Orders = () => {

  const {loading,data} = useQuery(QUERY_ME);
  console.log("Orders Page");

  console.log(data);

  const orders=data?.me || []

  console.log(orders);

  if (!orders.length) {
    return <h3>No Order Available</h3>;
  }

  console.log(...orders);

  return (
    <main>
      <div className="col-12 col-md-8 mb-3">
        Order Summary
  
      </div>
    </main>
  );
};

export default Orders;