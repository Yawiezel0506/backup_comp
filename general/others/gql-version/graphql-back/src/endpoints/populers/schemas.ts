import { gql } from 'apollo-server-express';

export const popularTypes = gql`
    type PopularProduct {
        product_id: String
        quantity: Int
  }
`;

export const popularQuery = `#graphql
    getAllPopulars: [PopularProduct]
`;




