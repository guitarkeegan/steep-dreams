const { User, Product, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //Get user data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("orders")
          .populate({
            path: "orders",
            populate: "productDetails",
          });

        return userData;
      }

      throw new AuthenticationError("User not logged in");
    },

    //Get all Product data
    getProducts: async (parent, args) => {
      const productData = await Product.find({});
      return productData;
    },

    //Get a specific Product Data using product id

    getProduct: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      const product = await Product.findOne(params);
      return product;
    },
  },

  Mutation: {
    //Create a user and tokenize the userdata

    addUser: async (parent, args) => {
      console.log(args);

      const user = await User.create(args);

      const token = signToken(user);
      if ((user = null)) {
        throw new AuthenticationError("Please type valid email and password");
      }
     
      return { token, user };
    },

    //Validate the user credentials and if valid tokenize the data

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("user");
      console.log(user);

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      //User method defined in the model

      const correctPassword = user.isCorrectPassword(password);
      console.log("--------");
      console.log("Password passed from form", password);

      console.log("Password match check");
      console.log(!correctPassword);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      console.log("token", token);

      return { token, user };
    },

    //Create Order

    //Add to local storage an Order:{totalPrice,productDetails} where productDetails
    //will be [productId1...,productId2...]
    //Once payment is completed,on submit order make createOrder mutation query with local storage value and clear the storage

    createOrder: async (parent, { totalPrice, productDetails }, context) => {
      // if (context.user) {

      const order = await Order.create({ totalPrice, productDetails });

      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { orders: order } },
        { new: true }
      )
        .populate("orders")
        .populate({ path: "orders", populate: "productDetails" });

      return updatedUser;
    },
  },

  // }
};

module.exports = resolvers;
