const {gql}=require('apollo-server-express');


const typeDefs=gql`


scalar Date

type User{
    _id:ID!
    email:String!
    orders:[Order]
}

type Auth {
    token: ID!
    user: User
  }

type Order{
    orderId:ID!
    price:Float
    createdAt:Date
    orderDetails:[Product]
    isComplete:Boolean
}


type Product{
    _id:ID
    image:String
    description:String
    name:String
    price:Float
    stockQuantity:Int
}


type Query{
    me:User
    getProducts:[Product]
    getProduct(_id:String!):Product  
}

type Mutation{

    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    updateOrder(_id:String!):Order
   
        
}

`;


/* TO DO

type Mutation{

     createOrder(
        price:Float ,
        createdAt:Date,
        orderDetails:[Product],
        isComplete:Boolean
        ):Order
}

*/


module.exports=typeDefs;