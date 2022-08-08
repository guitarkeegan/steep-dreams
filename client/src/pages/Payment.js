import React, { useState } from "react";
import {PaymentForm, ShippingForm} from "../components/Payment";

const Payment = () => {

    const styles = {
        formDiv: {
            maxWidth: 400,
        }
    }

  return (
    <div className="row justify-content-evenly">
    <div style={styles.formDiv} className="col-12 col-6-md">
    <h2>Payment</h2>
      <PaymentForm />
    </div>
    <div style={styles.formDiv} className="col-12 col-6-md">
    <h2>Shipping</h2>
      <ShippingForm />
    </div>
    </div>
  );
};

export default Payment;
