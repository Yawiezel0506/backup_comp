import { gql } from "apollo-server-express";

export const categoryTypes = gql`
  type Category {
    name: String!
    image: String!
    clicks: Int
  }

  input CategoryInput {
    name: String!
    image: String!
    clicks: Int
  }

`;  

export const categoryQuery = `#graphql
    getCategories: [Category]!
`;

export const categoryMutation = `#graphql
    setClick(id: String): Category
    createCategory(category: CategoryInput): Category
    createCategories(categories: [CategoryInput]): [Category]
`;
