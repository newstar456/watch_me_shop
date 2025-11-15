export type ProductType= {
    sku:string,
    name: string,
    price: number,
    image: string;
}

export type ProductQuery = {
  page: number;
  limit: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
};

export type CartItem = {
    sku: string;
    name: string;
    price: number;
    qty: number;
    image?: string;
};

export type Order = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    cart: CartItem[];
    totalPrice: number;
};

export type User = {
    id?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    token?: string; 
};