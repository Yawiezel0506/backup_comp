import { gql } from "apollo-server-express";

export const ordersTypes = gql`
  type SendCartProduct {
    name: String
    quantity: Int
    price: Int
    description: String
  }

  type ShippingDetails {
    address: String
    contactNumber: String
    orderType: String
  }

  type OrderDetails {
    cartItems: [SendCartProduct]   # This should be an output type
    orderTime: String
    price: Int
    status: String
    shippingDetails: ShippingDetails   # This should be an output type
    userId: String
  }

  input SendCartProductInput {
    name: String
    quantity: Int
    price: Int
    description: String
  }

  input ShippingDetailsInput {
    address: String
    contactNumber: String
    orderType: String
  }

  input SendOrderDetailsInput {
    cartItems: [SendCartProductInput]   # This should be an input type
    orderTime: String
    price: Int
    status: String
    shippingDetails: ShippingDetailsInput   # This should be an input type
    userId: String
  }
`;

export const ordersQuery = `#graphql
    getOrder(id: String): OrderDetails
`;

export const ordersMutation = `#graphql
    sendOrder(order: SendOrderDetailsInput): OrderDetails   
`;
