export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  clickCount: number;
  quantity: number;
  attributes: Attributes[];
}

export interface Attributes {
  key: string;
  value: number | string;
}

export interface Prices {
  minPrice: number;
  maxPrice: number;
}

export interface ProductInServerCart {
  productId: number;
  quantity: number;
  price: number;
  description: string;
}
