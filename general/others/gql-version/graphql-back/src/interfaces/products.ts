export interface Product {
    [x: string]: any;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    attribute: Attributes[];
    count: number;
    quantity: number;
  }
  
  export interface Attributes {
    key: string;
    value: number | string;
  }
  
  export interface ProductInput {
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    attribute?: Attributes[];
    count?: number;
    quantity?: number;
  }