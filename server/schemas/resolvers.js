const {User,Product}=require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers={

Query:{    
//Get user data
    me:async(parent,args,context)=>{
        if(context.user){

            const userData=User.findOne({ _id: context.user._id }).select('-__v -password')
            return userData;
        }

        throw new AuthenticationError('User not logged in');

    }




//Get all Product data



//Get a specific Product Data



//Get all Order specific to the user logged in

}
}


module.exports=resolvers;
