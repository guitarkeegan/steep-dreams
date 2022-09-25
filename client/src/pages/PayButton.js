import Button from "react-bootstrap/Button";



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
  

//     if(userData){

//       //Sending Order Notification

//       //Send email using Elastic Email API and SMTP js Library
//       //Below code rely on the /public/smtp.js file
//       //Commenting the email notification 

      
//         // window.Email.send({

//         //   SecureToken : "8466a82d-06a7-4a0a-96dc-067c65fb90c1",
//         //   To:userData.email,
//         //   From:"simmyvarghese5@gmail.com",
//         //   Subject:"Order Notifcation from SteepDreams",
//         //   Body:`
//         //   <div">
//         //   Hello ${userData.email.split('@')[0]},
//         //   <br>
//         //   <br>
//         //   Thanks for shopping with us.
//         //   <br>
//         //   Please login to see Your <a href="http://localhost:3000/orders">Order Details </a>
//         //   <br>
//         //   <br>
//         //   Have a Steep  Dreams  !!
//         //   <br>
//         //   From Steep Dreams Team
//         //   </div>`
//         // })
//         // .then((res)=>console.log("Email Sent Successfully",res))
//         // .catch(err=>console.log(err));
      
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

        const PayButton=({lineItems,totalPrice})=>{

            async function handleCheckout(){

              try{

                console.log(lineItems,totalPrice);

               const response =await fetch("http://localhost:3001/create-checkout-session",{
                  method:"POST",
                  headers:{

                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({

                    lineItems,totalPrice
                  })
               })

               const data=await response.json();
               if(data.url){

                window.location.href=data.url;
               }

              }
              catch(e){
                console.error(e);
              }

            }


            return(
                <Button className="my-4 w-100" onClick={handleCheckout}>
                Checkout
              </Button>
            )
      

        }

        export default PayButton;