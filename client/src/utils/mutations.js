import { gql } from '@apollo/client';



//Create user with email and password and return user data with order and product details
 
  export const CREATE_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token,
      user{
        _id
        email
      }
    } 
  }
`

  

//Get the user id,email and all orders associated to it,with each orders product details

export const USER_LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email     
      }
    }
  }`

  
// Create the Order with totalPrice and product Id passed to it and return updated User with Order is pushed to teh array

export const CREATE_ORDER= gql`
mutation createOrder($totalPrice: Float!, $productDetails: [ID]) {
  createOrder(totalPrice: $totalPrice, productDetails: $productDetails) {
    _id
    email
    orders {
      productDetails {
        _id
      }
    }
  }
}`






  //Mutation for Create Order to be added once the frontend code is completed
 /*TO BE REMOVED AT THE END
 
 export const CREATE_USER = gql`
 mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      user {
        email
        orders {
          orderId
          price
          createdAt
          orderDetails {
            _id
            image
            description
            name
            price
            stockQuantity
          }
          isComplete
        }
      }
    }
  }`


  export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }


  export const USER_LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
        orders {
          orderId
          price
          createdAt
          orderDetails {
            _id
            description
            name
            image
            price
            stockQuantity
          }
          isComplete
        }
      }
    }
  }`


`;
 */