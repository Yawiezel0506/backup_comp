import { gql } from 'apollo-server-express';

export const productsTypes = gql`
    type Product {
    id: Int
    title: String
    price: Float 
    description: String
    image: String
    category: String
    attributes: [Attributes]
    clickCount: Float
    quantity: Int
  }

  scalar JSONValue
  
  type Attributes {
    key: String
    value: JSONValue
  }

  input AttributesInput {
    key: String
    value: JSONValue
  }

  input ProductInput {
    id: String
    title: String 
    price: Float
    description: String
    category: String
    attributes: [AttributesInput]
    clickCount: Float
    quantity: Int
    image: String
  }
`;

export const productsQuery = `#graphql
    getAllProducts(input: ProductInput): [Product], 
    getProductById(id: String): Product
`;

export const productsMutation = `#graphql
    updateOrInsert(input: [ProductInput]): String
`;



