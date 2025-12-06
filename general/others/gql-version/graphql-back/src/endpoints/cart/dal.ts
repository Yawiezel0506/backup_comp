import { CartModel } from "../../db/schemas";
import { Cart, UpdateQuantity, ProductToDelete, AddToCart } from "../../interfaces/cart";

type CollectionResult = Promise<Cart | null | string>;

const findCart = async (userId: string) => {
    return CartModel.findOne({ userId });
  }

const getCart = async (userId: string): CollectionResult => {
  try {

    const cart = await findCart(userId);
    if (!cart) return 'No Cart found'
    const data:Cart = cart.toObject();
    console.log('Data fetched successfully');

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateQuantity = async (updateCart: UpdateQuantity): CollectionResult => {

    try {
        const cart = await findCart(updateCart.userId);

        if (!cart) return 'No Cart found';

        const productToUpdate = cart.products.findIndex(
            (product) => product.productId === updateCart.productId
        );

        if (productToUpdate === -1) {
            return 'Product not found in cart';
        }

        cart.products[productToUpdate].quantity += updateCart.quantity
        
        if (cart.products[productToUpdate].quantity === 0) {
            cart.products.splice(productToUpdate, 1);
        }

        const updatedCart = await cart.save();

        return updatedCart.toObject();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
  }
};

const addProduct = async (addToCart: AddToCart): CollectionResult => {

    try {
        let cart: Cart | null = await findCart(addToCart.userId);

        if (!cart) {
            cart = new CartModel({ userId: addToCart.userId, products: addToCart.products });
            await cart.save();
            console.log('Created a new cart for user:', addToCart.userId);
        } else {
            cart.products = [...cart.products, ...addToCart.products];
            await cart.save();
            console.log('Products added successfully to the cart:', addToCart.products);
        }

        return cart;
    } catch (error) {
        console.error('Error adding products to cart:', error);
        throw error;

  }
};

const deleteCart = async (userId: string): CollectionResult => {
  try {
    const cartToDelete = await CartModel.deleteOne({ userId: userId });
    if (!cartToDelete) return "no cart to delete";
    return `The cart deleted successfully!`;
  } catch (error) {
    console.error("Error deleting the cart:", error);
    throw error;
  }
};

const deleteProductInCart = async (
  productToDelete: ProductToDelete
): CollectionResult => {
  try {
    let cart: Cart | null = await findCart(productToDelete.userId);
    
    if (!cart) return 'The cart not found';
    
    const indexOfProductToDelete = cart.products.findIndex(
      (product) => product.productId === productToDelete.productId
    );
    
    if (indexOfProductToDelete === -1) return "product not in cart"

    cart.products.splice(indexOfProductToDelete, 1);
    await cart.save();
    return "product deleted successfully";
  } catch (error) {
    console.error("Error delete product:", error);
    throw error;
  }
};

const cartDal = {
  getCart,
  updateQuantity,
  addProduct,
  deleteCart,
  deleteProductInCart,
};

export default cartDal;
