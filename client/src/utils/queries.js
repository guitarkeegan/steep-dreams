import {gql} from "@apollo/client";

export const QUERY_PRODUCTS = gql`
query GetProducts {
  getProducts {
    name
    image
    description
    price
  }
}
`