import React, { useState } from "react";

import {PaymentForm, ShippingForm} from "../components/Payment";

const Payment = () => {

    const [paymentInput, setPaymentInput] = useState({
        fName: "",
        lName: "",
        addr1: "",
        addr2: "",
        cardNum: "",
        cvc: "",
        city: "",
        state: "",
        zip: ""
    })

    const [shippingInput, setShippingInput] = useState({
        fName: "",
        lName: "",
        email: "",
        addr1: "",
        addr2: "",
        city: "",
        state: "",
        zip: ""
    })

    const handlePopulate = (event, fName, lName, addr1, addr2, cardNum, cvc, city, state, zip) => {
        if (fName && lName && addr1 && addr2 && cardNum && cvc && city && state && zip) {
            event.preventDefault();
            setShippingInput({fName, lName, addr1, addr2, city, state, zip})
        } else {
            
        }
    }

    const handleSubmit = () => {

    }

    const styles = {
        formDiv: {
            maxWidth: 400,
        }
    }

  return (
    <div className="row justify-content-evenly">
    <div style={styles.formDiv} className="col-12 col-6-md">
    <h2>Payment</h2>
      <PaymentForm populateShipping={handlePopulate} />
    </div>
    <div style={styles.formDiv} className="col-12 col-6-md">
    <h2>Shipping</h2>
      <ShippingForm handleSubmit={handleSubmit} />
    </div>
    </div>
  );
};

export default Payment;
