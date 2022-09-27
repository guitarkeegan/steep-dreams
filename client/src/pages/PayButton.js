import Button from "react-bootstrap/Button";
import { CREATE_ORDER } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

/* TO DO 
  Place Order Handler
  Create an Order entry in DB
  Send Out Email Notification on Order
  */
//   const placeOrderHandler = async () => {

//     //Get Total Price and Array of ProductIDs

// try{
//     const  {data}  = await addOrder({
//       variables: { totalPrice:totalPrice ,productDetails:[...savedProducts]},
//     });

//     // const userData=data?.createOrder || [];
//     const userData=data?.createOrder;

//         //Remove from Local Storage
//         localStorage.removeItem("saved_products");

//       //Navigate To payment page

//       // window.location.assign('/payment');

//     }

//   }catch(error){
//     console.log(error);
//   }

//   };

//TODO
//Add Place Order Functionality with Create Order-Above code

const PayButton = ({ lineItems, totalPrice, savedProducts }) => {
  const [addOrder, { error }] = useMutation(CREATE_ORDER);

  async function handleCheckout() {
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
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      console.log(response);

      // if (data.url) {
      //   window.location.href = data.url;

        
      // }

      // if( window.location.href===data.success_url){

      //   const { orderData } = await addOrder({
      //     variables: {
      //       totalPrice: totalPrice,
      //       productDetails: [...savedProducts],
      //     },
      //   });
       
      //   const userData = orderData?.createOrder || [];
      //   if (userData) {
      //     localStorage.removeItem("saved_products");
      // } 

      // }

    
        

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
