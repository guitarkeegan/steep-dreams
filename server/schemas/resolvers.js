const {User,Product,Order}=require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const {signUpEmail, addNewUserTags} = require('../utils/mailchimp');
const {sendWelcomeEmail, sendOrderConfirmation} = require('../utils/nodemailer');
// import models, apollo error helper, and signToken

const resolvers={

Query:{    
    
//Get the orders for the logged-in user, and also get the product details within each order.
    me:async(parent,args,context)=>{
        if(context.user){


            const userData=User.findOne({ _id: context.user._id })
            .select('-__v -password')
             .populate('orders').populate({
              path:'orders',
              populate:'productDetails'
             });

            return userData;
        }

        throw new AuthenticationError('User not logged in');

    },

    //Get all Product data. Use this on the Product page.
    getProducts: async (parent, args) => {
      const productData = await Product.find({});
      return productData;
    },

    //Get a specific Product Data using product id. We have not yet used this query the project. It would be used for a focused look at a specific product.

    getProduct: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      const product = await Product.findOne(params);
      return product;
    },
  
  
  //Get a Product with productName. We use the query in the search bar component. 

  getProductByName: async (parent, { name }) => {
 
    const product = await Product.find({name:name});
    return product[0];
  }

  
}
  
  ,

  Mutation: {
    //Create a user and tokenize the userdata. 
    addUser: async (parent, args) => {

      const user = await User.create(args);

      const token = signToken(user);
      if ((user === null)) {
        throw new AuthenticationError("Please type valid email and password");
      }

      signUpEmail(args.email);
      sendWelcomeEmail(args.email);
      // await addNewUserTags(args.email);
      // await sendCampaignToNewMembers();
      // await getAllCampaigns();
      // await updateCampaignSettings();
      // await resendCampaign();

      return { token, user };
    },

    //Validate the user credentials and if valid tokenize the data
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      //User method defined in the model
      const correctPassword = user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    //Create Order
    // pass total price and product details, if user is signed in, create a new order and add it to the user's orders array. Returnt he updated user along with order and product details.
    createOrder: async (parent, { totalPrice, productDetails }, context) => {
      
      
        if (context.user) {

            const order=await Order.create({totalPrice,productDetails});
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { orders: order }},
              { new: true }
            )
            .populate('orders'). 
            populate(
                {path:'orders',
                populate:'productDetails'
                }
                );

            sendOrderConfirmation(context.user.email);

            return updatedUser;

        }

    }


    },
  }






module.exports=resolvers;
