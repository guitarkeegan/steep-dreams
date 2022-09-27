import Button from "react-bootstrap/Button";
import { CREATE_ORDER } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../utils/auth.js"


const PayButton = ({ lineItems,totalPrice}) => {
  const [addOrder, { error }] = useMutation(CREATE_ORDER);

  async function handleCheckout() {

    //Removing the LocalStorage
    localStorage.removeItem("saved_products");

    const userId=AuthService.getProfile().data.email;


    //STRIPE INTEGRATION
    try {
      const response = await fetch(
        "http://localhost:3001/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lineItems,
            userId,
            totalPrice
          }),
        }
      );

      const data = await response.json();
      
      //Navigate to Stripe Payment
      if (data.url) {
        window.location.href = data.url;
      }

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Button className="my-4 w-100" onClick={handleCheckout}>
      Checkout
    </Button>
  );
};

export default PayButton;
