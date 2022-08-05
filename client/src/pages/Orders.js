import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// useing query to render products

const Orders = () => {

  const {loading,orderData} =useQuery(QUERY_ME);

  console.log(orderData);

  return (
    <main>
      <div className="col-12 col-md-8 mb-3">
        My Order Summary
      </div>
    </main>
  );
};

export default Orders;