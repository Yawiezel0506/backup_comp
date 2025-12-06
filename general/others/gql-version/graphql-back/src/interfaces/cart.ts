interface UpdateQuantity {
    userId: string;
    productId: string;
    quantity: number;
}

interface ProductToDelete {
    userId: string;
    productId: string;
}

interface AddToCart {
    userId: string;
    products: ProductCart[];
}

interface ProductCart {
    productId: string;
    quantity: number;
    description: string;
    price: number;
}
  
interface Cart {
    [x: string]: any;
    toObject(): Cart;
    userId:string,
    products:ProductCart[]
}

export {
    UpdateQuantity,
    ProductToDelete,
    AddToCart,
    ProductCart,
    Cart
}