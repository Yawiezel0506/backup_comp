import couchbase, {
  Bucket,
  Collection,
  GetResult,
  MutationResult,
} from "couchbase";
import { v4 as uuidv4 } from "uuid";
import { getAllProducts } from "./utils/getAllProducts";
import { filterProducts } from "./utils/filterProducts";

const clusterConnStr = "couchbases://cb.y9yffs4jwwr1wqn.cloud.couchbase.com"; // Replace this with Connection String
const username = "ysw"; // Replace this with username from database access credentials
const password = "Yawiezel@0506"; // Replace this with password from database access credentials

const productsResolvers = {
  query: {
    async getProduct(_, args, contextValue) {
      // In default get 4 params (parent, args, contextValue, info)
      //   args: {id: "1"}, contextValue: {couchbaseCluster: Cluster}
      const { id } = args;
      const bucket: Bucket = contextValue.couchbaseCluster.bucket("store");
      const collection: Collection = bucket
        .scope("products-scope")
        .collection("products");
      const getResult: GetResult = await collection.get(id).catch((error) => {
        console.log("error", error);
        throw error;
      });

      return getResult.content;
    },
    async getAllProductsWithTerm(_, args, contextValue) {
      const { query } = args;
      const products = await getAllProducts();
      if (!products) return "no products found!";
      const filter = query?.length ? filterProducts(query, products) : products;
      return filter;
    },
  },
  mutation: {
    async createProduct(_, args, contextValue) {
      const { product } = args;

      const bucket: Bucket = contextValue.couchbaseCluster.bucket("store");
      const collection: Collection = bucket
        .scope("products-scope")
        .collection("products");

      const id = uuidv4();

      const createMutationResult: MutationResult = await collection
        .insert(id, product)
        .catch((error) => {
          console.log("error", error);
          throw error;
        });

      return product;
    },
    async deleteProduct(_, args, contextValue) {
      const { id } = args;

      const bucket: Bucket = contextValue.couchbaseCluster.bucket("store");
      const collection: Collection = bucket
        .scope("products-scope")
        .collection("products");

      const deletedMutationResult: MutationResult = await collection
        .remove(id)
        .catch((error) => {
          console.log("error", error);
          throw error;
        });

      return true;
    },
    async updateProduct(_, args, contextValue) {
      const { id, newProduct } = args;

      const bucket: Bucket = contextValue.couchbaseCluster.bucket("store");
      const collection: Collection = bucket
        .scope("products-scope")
        .collection("products");

      const updatedMutationResult: MutationResult = await collection
        .replace(id, newProduct)
        .catch((error) => {
          console.log("error", error);
          throw error;
        });

      return newProduct;
    },
    async setQuantity(_, args, contextValue) {
      const { id, quantity } = args;

      const bucket: Bucket = contextValue.couchbaseCluster.bucket("store");
      const collection: Collection = bucket
        .scope("products-scope")
        .collection("products");

      const updatedMutationResult: MutationResult = await collection
        .mutateIn(id, [couchbase.MutateInSpec.replace("quantity", quantity)])
        .catch((error) => {
          console.log("error", error);
          throw error;
        });

      return true;
    },
  },
};

export default productsResolvers;
