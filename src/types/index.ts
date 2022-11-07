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
