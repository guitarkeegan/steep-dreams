const {gql}=require('apollo-server-express');


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
    getProductByName(name:String):Product
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

//Need to fix the productDetails type once the front end code is finalized and make createOrder call 


module.exports=typeDefs;