import { gql } from '@apollo/client';


//Create user with email and password and return user data with order and product details
 
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

  

//Get the user id,email and all orders associated to it,with each orders product details

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



  //Mutation for Create Order to be added once the frontend code is completed
 