const {User,Product,Order}=require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
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
             })

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
    const params = name ? { name } : {};
    const product = await Product.findOne({params});
    return product;
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

    //Add to local storage an Order:{totalPrice,productDetails} where productDetails
    //will be [productId1...,productId2...]
    //Once payment is completed,on submit order make createOrder mutation query with local storage value and clear the storage

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

            return updatedUser;

        }

    }


    },
  }






module.exports=resolvers;
