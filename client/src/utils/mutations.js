import { gql } from '@apollo/client';


export const CREATE_INBOX=gql`
mutation {
  createInbox {
    id
    emailAddress
  }
}
`

export const SEND_EMAIL=gql`
mutation SendEmail(
  $fromInboxId: String!
  $to: [String!]!
  $subject: String!
) {
  sendEmail(fromInboxId: $fromInboxId, to: $to, subject: $subject) {
    id
  }
}
`

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
`;


  

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




  //Mutation for Create Order to be added once the frontend code is completed
 /*
 
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