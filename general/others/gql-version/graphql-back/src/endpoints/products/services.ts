import productsDal from "./dal";
import { Product } from "../../interfaces/products";

const getAllProducts = async (query: Record<string, unknown>) => {
  try {
    const result = await productsDal.getAllProducts();
    
    let products: Product[] = [];
    
    if (Object.keys(query).length) {
      for (let key in query) {
        if (result.length) {
          products = result.filter((product: Product) => {            
            return product[key] == query[key];
          });
        }
      }
      return products;
    }
    if (!result.length) return "products not found";
    return result;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id: number) => {
  try {
    const product = await productsDal.getProductById(id);
    if (!product) return "product not found";
    return product;
  } catch (error) {
    throw error;
  }
};

const updateOrInsert = async (body: Product | Product[]) => {
  try {
    const product = await productsDal.updateOrInsert(body);
    if (!product) return "product not found";
    return product;
  } catch (error) {
    throw error;
  }
};

const productService = {
  getAllProducts,
  getProductById,
  updateOrInsert,
};

export default productService;
