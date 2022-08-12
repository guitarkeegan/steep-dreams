import {gql} from "@apollo/client";

export const QUERY_ME = gql`
{
  me {
    _id
    email
    orders {
      createdAt
      totalPrice
      productDetails {
        _id
        image
        description
        name
        price
        stockQuantity
      }
    }
  }
}
`

export const QUERY_PRODUCTS = gql`
{
getProducts {
  _id
  image
  description
  name
  price
  stockQuantity
}
}
`

export const QUERY_SINGLE_PRODUCT = gql`
{
getProduct(_id: $id) {
  _id
  image
  description
  name
  price
  stockQuantity
}
}
`

// export const QUERY_PRODUCT_BY_NAME= gql`
// {
//   getProductByName(name:$name){
//       _id
//     image
//     description
//     name
//     price
//     stockQuantity

//   }
// }
// `

export const QUERY_PRODUCT_BY_NAME= gql`
query Query($name: String!) {
  getProductByName(name: $name) {
    _id
    image
    description
    name
    price
    stockQuantity
  }
}
`



