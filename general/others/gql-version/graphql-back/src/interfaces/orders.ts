export interface SendCartProduct {
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface ShippingDetails {
  address: string;
  contactNumber: string;
  orderType: string;
}

export interface SendOrderDetails {
  cartItems: SendCartProduct[];
  orderTime: string;
  price: number;
  status: string;
  shippingDetails: ShippingDetails;
  userId: string;
}
