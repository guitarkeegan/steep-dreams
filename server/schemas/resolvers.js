const {User,Product}=require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { GraphQLDateTime } = require("graphql-iso-date");

 const customScalarResolver = {
  Date: GraphQLDateTime
};




const resolvers={

Query:{    
//Get user data
    me:async(parent,args,context)=>{
        if(context.user){

            const userData=User.findOne({ _id: context.user._id }).select('-__v -password')
            console.log(userData);
            return userData;
        }

        throw new AuthenticationError('User not logged in');

    },

//Get all Product data
    getProducts:async(parent,args)=>{
        const productData= await Product.find({});
        return productData;
    },

//Get a specific Product Data using product id

    getProduct:async(parent,{_id})=>{
    const params=_id ? {_id} :{};
    const product= await Product.findOne(params);
    console.log(product);
    return product;

    }

},

Mutation:{
    //TO DO
}
}


module.exports={resolvers,customScalarResolver};
