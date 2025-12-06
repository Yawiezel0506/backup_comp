import { gql } from "apollo-server-express";
import { cartMutation, cartQuery, cartTypes } from "../endpoints/cart/schemas";
import { categoryMutation, categoryQuery, categoryTypes } from "../endpoints/categories/schemas";
import { productsTypes, productsQuery, productsMutation } from '../endpoints/products/schemas';
import { usersQuery, usersMutation, usersType } from "../endpoints/users/schemas";
import { ordersMutation, ordersQuery, ordersTypes } from "../endpoints/orders/schemas";
import { bannersMutation, bannersQuery, bannersTypes } from "../endpoints/banners/schemas";
import { cartResolvers } from "../endpoints/cart/resolvers";
import { categoryResolvers } from "../endpoints/categories/resolvers";
import { productResolvers } from '../endpoints/products/resolvers';  
import { UsersResolvers } from "../endpoints/users/resolvers";
import { ordersResolvers } from "../endpoints/orders/resolvers";
import { bannersResolvers } from "../endpoints/banners/resolvers";
import { popularTypes, popularQuery } from "../endpoints/populers/schemas";
import { populerResolvers } from "../endpoints/populers/resolvers";

export const typeDefs = gql`

  ${cartTypes}
  ${productsTypes}
  ${categoryTypes}
  ${usersType}
  ${ordersTypes}
  ${bannersTypes}
  ${popularTypes}
  
  type Query {
    ${cartQuery}
    ${productsQuery}
    ${categoryQuery}
    ${usersQuery}
    ${ordersQuery}
    ${bannersQuery}
    ${popularQuery}
  }

  type Mutation {
    ${cartMutation}
    ${productsMutation}
    ${categoryMutation}
    ${usersMutation}
    ${ordersMutation}
    ${bannersMutation}
  }

  type Subscription {
    
  }
`;

export const resolvers = {
  Query: {
    ...cartResolvers.Query,
    ...productResolvers.Query,
    ...categoryResolvers.Query,
    ...UsersResolvers.Query,
    ...ordersResolvers.Query,
    ...bannersResolvers.Query,
    ...populerResolvers.Query
  },
  Mutation: {
    ...cartResolvers.Mutation,
    ...productResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...UsersResolvers.Mutation,
    ...ordersResolvers.Mutation,
    ...bannersResolvers.Mutation
  },
};
