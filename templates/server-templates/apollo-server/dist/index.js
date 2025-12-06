import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { log } from "console";
import couchbase from "couchbase";
import { v4 as uuidv4 } from "uuid";
const typeDefs = `#graphql
    type Product {
        name: String
        price: Float
        quantity: Int
        tags: [String]
    }

    input ProductInput {
        name: String
        price: Float
        quantity: Int
        tags: [String]
    }

    type Query {
        getProduct(id: String): Product
        getAllProductsWithTerm(term: String): [Product]
    }

    type Mutation {
        createProduct(product: ProductInput): Product
        deleteProduct(id: String): Boolean
        updateProduct(id: String, newProduct: ProductInput): Product
        setQuantity(id: String, quantity: Int): Boolean
    }
`;
/*

Mutations -> changes data

TODO:
X createProduct
TODO:
X deleteProduct
TODO:
X updateProduct
TODO:
X getAllProductsWithTerm
TODO:
_ setQuantity

*/
const resolvers = {
    Query: {
        async getProduct(_, args, contextValue) {
            // In default get 4 params (parent, args, contextValue, info)
            //   args: {id: "1"}, contextValue: {couchbaseCluster: Cluster}
            const { id } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const getResult = await collection.get(id).catch((error) => {
                log("error", error);
                throw error;
            });
            return getResult.content;
        },
        async getAllProductsWithTerm(_, args, contextValue) {
            const { term } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const result = await contextValue.couchbaseCluster.searchQuery("index-products", couchbase.SearchQuery.match(term), {
                limit: 2,
            });
            const productsArray = [];
            for (let i in result.rows) {
                const id = result.rows[i].id;
                const getResult = await collection.get(id).catch((error) => {
                    log("error", error);
                    throw error;
                });
                productsArray.push(getResult.content);
            }
            return productsArray;
        },
    },
    Mutation: {
        async createProduct(_, args, contextValue) {
            const { product } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const id = uuidv4();
            const createMutationResult = await collection
                .insert(id, product)
                .catch((error) => {
                log("error", error);
                throw error;
            });
            return product;
        },
        async deleteProduct(_, args, contextValue) {
            const { id } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const deletedMutationResult = await collection
                .remove(id)
                .catch((error) => {
                log("error", error);
                throw error;
            });
            return true;
        },
        async updateProduct(_, args, contextValue) {
            const { id, newProduct } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const updatedMutationResult = await collection
                .replace(id, newProduct)
                .catch((error) => {
                log("error", error);
                throw error;
            });
            return newProduct;
        },
        async setQuantity(_, args, contextValue) {
            const { id, quantity } = args;
            const bucket = contextValue.couchbaseCluster.bucket("store");
            const collection = bucket
                .scope("products-scope")
                .collection("products");
            const updatedMutationResult = await collection
                .mutateIn(id, [couchbase.MutateInSpec.replace("quantity", quantity)])
                .catch((error) => {
                log("error", error);
                throw error;
            });
            return true;
        },
    },
};
const server = new ApolloServer({
    typeDefs, //typesDefs -> defining our graphql types (product, query, mutation, etc )
    resolvers, //resolvers -> create the logic for certain graphql types (query, mutation)
});
// User inputs
const clusterConnStr = "couchbases://cb.y9yffs4jwwr1wqn.cloud.couchbase.com"; // Replace this with Connection String
const username = "ysw"; // Replace this with username from database access credentials
const password = "Yawiezel@0506"; // Replace this with password from database access credentials
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
        // Get a reference to the cluster
        couchbaseCluster: await couchbase.connect(clusterConnStr, {
            username: username,
            password: password,
            // Use the pre-configured profile below to avoid latency issues with your connection.
            configProfile: "wanDevelopment",
        }),
    }),
    //   inside of our API endpoint -> context.couchbaseCluster
});
console.log(`Server running on ${url}`);
