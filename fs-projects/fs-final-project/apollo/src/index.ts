import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectToDatabase } from "./utils/dbConnection";
import {
  productsMutation,
  productsQuery,
  productsType,
} from "./schemas/products";
import productResolvers from "./resolvers/products"

const typeDefs = `#graphql
    ${productsType}

    type Query {
        ${productsQuery}
    }

    type Mutation {
        ${productsMutation}
    }
`;

const resolvers = {
  Query: {
    ...productResolvers.query,
  },
  Mutation: {
    ...productResolvers.mutation,
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
      myName: "Jonathan",
    }),
  });
  await connectToDatabase();
  console.log(`Server running on ${url}`);
})();
