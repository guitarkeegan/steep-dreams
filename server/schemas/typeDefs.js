const {gql}=require('apollo-server-express');
// import gql to define typedefs.

// define the shape of returned data.
const typeDefs=gql`

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
    _id:ID
    totalPrice:Float
    createdAt:String
    productDetails:[Product]
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
    getProductByName(name:String!):Product
}


type Mutation{

    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createOrder(
        totalPrice:Float!,
        productDetails:[ID]
        ):User
}
`;

// Mutations to create a new user or login, then return an Auth token. Create order will return a User type updated Orders array.


module.exports=typeDefs;