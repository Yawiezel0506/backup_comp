import cartDal from './dal'
import { Cart, UpdateQuantity, ProductToDelete, AddToCart } from "../../interfaces/cart";


type CollectionResult = Promise<Cart | null | string>;
type Result = Cart | null | string;

const getCart = async (userId: string):CollectionResult => {
    try {
        const cart: Result = await cartDal.getCart(userId);
      if (!cart) return 'cart of this user not found' ;
      return cart;
    } catch (error) {
      throw error
    }
  };

const updateQuantity = async (updateQuantity: UpdateQuantity): CollectionResult => {
    try {
      const cart: Result = await cartDal.updateQuantity(updateQuantity)
      if (!cart) return 'cart of this user not found' ;

      if (cart === 'Product not found in cart') return 'Product not in cart';
        
      return cart;
    } catch (error) {
      throw error
    }
  };
  
const addProduct = async (product: AddToCart): CollectionResult => {
    try {
        const cartToAdd: Result = await cartDal.addProduct(product);
        if (!cartToAdd) return 'cart of this user not found' ;

      return cartToAdd;
    } catch (error) {
      throw error
    }
  };
  
const deleteCart = async (userId: string) => {
    try {
      const cartToDelete = await cartDal.deleteCart(userId)
      if (!cartToDelete) return 'cart of this user not found' ;
      return cartToDelete
    } catch (error) {
      return error
    }
  };
  
  const deleteProductInCart = async (productToDelete: ProductToDelete) => {
    
    try {
        const cartToDelete = await cartDal.deleteProductInCart(productToDelete)
        if (!cartToDelete) return 'cart of this user not found' ;
        
      return cartToDelete
    } catch (error) {
      return error
    }
  };

  const cartService = {
    getCart,
    updateQuantity,
    addProduct,
    deleteCart,
    deleteProductInCart
  }
  
  export default cartService 