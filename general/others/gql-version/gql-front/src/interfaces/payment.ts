import { SendCartProduct } from "../rtk/cartSlice";

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

export interface Total {
  total: number | null;
}
