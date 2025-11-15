import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType, CartItem, Order, User, ProductQuery } from "../types";

type PexelsPhoto = {
  src: {
    large: string;
  };
};

const API = "https://6900d632ff8d792314bbb519.mockapi.io/api";

type State = {
  products: ProductType[];
  productsAll: ProductType[];
  productQuery: ProductQuery;
  setProductQuery: (q: Partial<ProductQuery>) => void;
  isLoadingProducts: boolean;
  isLoadingOrders: boolean;
  pexelsImages: PexelsPhoto[],
  setPexelsImages: (images: PexelsPhoto[]) => void, 
  fetchProducts: () => Promise<void>;
  fetchProductsAll: () => Promise<void>;
  cart: CartItem[];
  totalItems: () => number;
  totalCostFormatted: () => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clearCart: () => void;
  user: User | null;
  setUser: (u: User | null) => void;
  orders: Order[];
  lastCreatedOrderId?: string;
  createOrder: (o: Omit<Order, "id">) => Promise<string | null>;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  updateOrder: (id: string, data: Partial<Order>) => Promise<boolean>;
  deleteOrder: (id: string) => Promise<boolean>;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      // ---------- NON-PERSISTED ----------
      products: [],
      productsAll: [],
      isLoadingProducts: false,
      isLoadingOrders: false,
      pexelsImages: [],
      setPexelsImages: (images) => set({ pexelsImages: images }),

      // ---------- PERSISTED ----------
      productQuery: {
        page: 1,
        limit: 12,
        sortBy: "price",
        order: "asc",
        search: "",
      },

      cart: [],
      user: null,
      orders: [],
      lastCreatedOrderId: undefined,

      // ---------- ACTIONS ----------
      setProductQuery: (q) =>
        set((s) => ({
          productQuery: { ...s.productQuery, ...q },
        })),

      // LOAD PAGINATED PRODUCTS
      fetchProducts: async () => {
        try {
          set({ isLoadingProducts: true });

          const { page, limit, sortBy, order, search } = get().productQuery;
          const params = new URLSearchParams();

          params.append("page", String(page));
          params.append("limit", String(limit));
          if (sortBy) params.append("sortBy", sortBy);
          if (order) params.append("order", order);
          if (search) params.append("name", search);

          const res = await fetch(`${API}/products?${params.toString()}`);
          const json = await res.json();

          const images = get().pexelsImages;
        //   console.log(images);
          if (!images || images.length === 0) {
            set({ products: json });
            return;
          }

          const merged = json.map((p: ProductType, i: number) => ({
            ...p,
            image: `${images[i % images.length].src.large}?auto=compress&fit=crop&w=400&h=400`,
          }));

          set({ products: merged });
        } catch (err) {
          console.error(err);
        } finally {
          set({ isLoadingProducts: false });
        }
      },

      fetchProductsAll: async () => {
        try {
          const res = await fetch(`${API}/products`);
          const json = await res.json();

          const pexelsRes = await fetch(
            "https://api.pexels.com/v1/search?query=watches&per_page=30",
            {
              headers: { Authorization: import.meta.env.VITE_PEXELS_KEY },
            }
          );
          const pexelsData = await pexelsRes.json();
          if (!pexelsData.photos || pexelsData.photos.length === 0) {
            set({ productsAll: json });
            return;
          }          

          const merged = json.map((p: ProductType, i: number) => ({
            ...p,
            image: `${pexelsData.photos[i % pexelsData.photos.length].src.large}?auto=compress&fit=crop&w=400&h=400`,
          }));

          set({ productsAll: merged });
        } catch (err) {
          console.error(err);
        }
      },

      totalItems: () => get().cart.reduce((s, i) => s + i.qty, 0),

      totalCostFormatted: () => {
        const total = get().cart.reduce(
          (sum, i) => sum + i.qty * i.price,
          0
        );
        return total;
      },

      addToCart: (item) => {
        set((state) => {
          const existing = state.cart.find((i) => i.sku === item.sku);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.sku === item.sku ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        });
      },

      removeFromCart: (sku) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.sku !== sku),
        })),

      setQty: (sku, qty) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.sku === sku ? { ...i, qty } : i
          ),
        })),

      clearCart: () => set({ cart: [] }),

      setUser: (u) => set({ user: u }),

      // ---------- ORDERS ----------
      createOrder: async (orderData) => {
        try {
          const res = await fetch(`${API}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          if (!res.ok) throw new Error("Failed to create order");

          const newOrder: Order = await res.json();

          set({
            lastCreatedOrderId: newOrder.id,
            orders: [...get().orders, newOrder],
          });

          return newOrder.id ?? null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },

      fetchOrders: async () => {
        try {
          set({ isLoadingOrders: true });
          const res = await fetch(`${API}/orders`);
          const data: Order[] = await res.json();
          set({ orders: data });
        } catch (err) {
          console.error(err);
        } finally {
          set({ isLoadingOrders: false });
        }
      },

      fetchOrderById: async (id) => {
        try {
          const res = await fetch(`${API}/orders/${id}`);
          if (!res.ok) return null;
          return (await res.json()) as Order;
        } catch (err) {
          console.error(err);
          return null;
        }
      },

      updateOrder: async (id, updateData) => {
        try {
          const res = await fetch(`${API}/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
          });
          if (!res.ok) return false;

          const updated = (await res.json()) as Order;
          set({
            orders: get().orders.map((o) =>
              o.id === id ? updated : o
            ),
          });
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      },

      deleteOrder: async (id) => {
        try {
          const res = await fetch(`${API}/orders/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) return false;

          set({
            orders: get().orders.filter((o) => o.id !== id),
          });
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      },
    }),

    // ---------- PERSIST ONLY THESE KEYS ----------
    {
      name: "watchme_store",
      partialize: (state) => ({
        // productQuery: state.productQuery,
        cart: state.cart,
        user: state.user,
        orders: state.orders,
        lastCreatedOrderId: state.lastCreatedOrderId,
      }),
    }
  )
);
