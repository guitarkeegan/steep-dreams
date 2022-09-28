require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const stripe=require("stripe")(process.env.STRIPE_KEY);
const auth=require("./utils/auth");
const {Order,User}=require("./models");



const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // persistedQueries: false,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use('/webhook', express.raw({type: '*/*'}))
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

/*************STRIPE INTEGRATION*********/


app.post('/create-checkout-session', async (req, res) => {


console.log("Total price",req.body.totalPrice);
  const customerMetaData=req.body.lineItems.map(lineItem=>{

    return{

      product_data: {
        id:lineItem.productInfo._id,
        name: lineItem.productInfo.name,
        images:[lineItem.productInfo.image],
      },
      unit_amount:Math.round(lineItem.productInfo.price)*100,
      quantity: lineItem.quantity,
    }
    

  });


  const customer=await stripe.customers.create({

    metadata:{
      userId:req.body.userId,
      cart:JSON.stringify(customerMetaData),
      totalPrice:req.body.totalPrice
    }
  })


  

  const lineItems=req.body.lineItems.map(lineItem=>{


    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: lineItem.productInfo.name,
          images:[lineItem.productInfo.image],
          description:lineItem.productInfo.description,
          metadata:{
            id:lineItem.productInfo._id
          }
        },
        unit_amount:Math.round(lineItem.productInfo.price)*100,
      },
      quantity: lineItem.quantity,
    }
  })




  const session = await stripe.checkout.sessions.create({

    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
    
    line_items:lineItems,
    customer:customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/orders`,
    cancel_url: `${process.env.CLIENT_URL}/products`,
  });

  console.log(session.success_url);
  res.status(200).send({url:session.url});
});


/*******STRIPE WEBHOOK*******/


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_391299eed41bd1900d3b804d9b7b3311b712dfd295e0dfb2bb30b1d8e6edd708";

app.post('/webhook',  async(request, response) => {
  const sig = request.headers['stripe-signature'];


  let event;


  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(err);
    return;
  }

    const createOrder= async function ({ totalPrice, productDetails },email){
      
   
      

          const order=await Order.create({totalPrice,productDetails});
          console.log("Created Order",order);
          const updatedUser = await User.findOneAndUpdate(
            { email: email},
            { $push: { orders: order }},
            { new: true }
          )
          .populate('orders'). 
          populate(
              {path:'orders',
              populate:'productDetails'
              }
              );

          return updatedUser;

      

  }
  let data=event.data.object;
  let eventType=event.type;
  // Handle the event
     if(eventType==="checkout.session.completed"){
        stripe.customers.retrieve(data.customer)
        .then(customer=>{
          console.log("Rerieving Customer");
          console.log(customer);

          console.log( JSON.parse(customer.metadata.cart));

          const productIds=JSON.parse(customer.metadata.cart).map(product=>product.product_data.id);
          // console.log("Array Of Ids",productIds);
          const productDetails=productIds;
          const totalPrice=JSON.parse(customer.metadata.totalPrice);
          const customerEmail=customer.metadata.userId;
          try{

            const updatedUser=createOrder({totalPrice,productDetails},customerEmail);
        
      
        console.log("Updated User",updatedUser);
           
          }
          catch(e){
            console.log(e);
          }

          
          
          
        })
        .catch(e=>console.log(e))


     }

     else{

      console.log(eventType,event);
     }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
