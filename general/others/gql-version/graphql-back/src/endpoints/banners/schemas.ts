import { gql } from "apollo-server-express";

export const bannersTypes = gql`
  type Image {
    alt: String
    url: String
  }
  type Banner {
    author: String
    category: String
    createdAt: String
    id: Int
    image: Image
    productID: Int
    rating: Int
    sale: Int
    text: String
    _id: String
  }
`;

export const bannersQuery = `#graphql
    getBanners: [Banner]
    getBanner(Category: String): Banner
`;

export const bannersMutation = `#graphql
      
`;
