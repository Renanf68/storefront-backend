export interface User {
  id?: string;
  username: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  password_digest?: string;
}
export interface Category {
  id?: string;
  name: string;
}
export interface Product {
  id?: string;
  name: string;
  price: number;
  category_id: string;
}

export type OrderStatus = "active" | "complete" | "canceled";
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  id?: string;
  status: OrderStatus;
  user_id: string;
  items?: OrderItem[];
}
export interface OrderProducts {
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
}
