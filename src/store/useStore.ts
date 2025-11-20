import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType, CartItem, Order, User, ProductQuery } from "../types";


type PexelsPhoto = {
  src: { large: string };
};

const API = "https://6900d632ff8d792314bbb519.mockapi.io/api";
const PEXELS_QUERY = "watches";
const PEXELS_PER_PAGE = 30;
const FALLBACK_IMAGE = "https://via.placeholder.com/400x400?text=No+Image";

type State = {
  // product lists
  products: ProductType[]; // current page (after filter/sort/paginate)
  productsAll: ProductType[]; // all fetched products (with images)
  totalProducts: number; // total number after filtering (for pagination)
  pexelsImages: PexelsPhoto[];

  // query & helpers
  productQuery: ProductQuery;
  setProductQuery: (q: Partial<ProductQuery>) => void;
  processProducts: () => void;

  // loading flags
  isLoadingProducts: boolean;
  isLoadingOrders: boolean;

  // pagination / fetch actions
  fetchProductsAll: () => Promise<void>;

  // cart
  cart: CartItem[];
  totalItems: () => number;
  totalCostFormatted: () => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clearCart: () => void;

  // user
  user: User | null;
  setUser: (u: User | null) => void;

  // orders
  orders: Order[];
  lastCreatedOrderId?: string | null;
  createOrder: (o: Omit<Order, "id">) => Promise<string | null>;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  updateOrder: (id: string, data: Partial<Order>) => Promise<boolean>;
  deleteOrder: (id: string) => Promise<boolean>;

    //favorites   
  favorites: string[]; // array of product.sku
  toggleFavorite: (sku:string) => void;
  isFavorite: (sku:string) => boolean;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      // -------- NON-PERSISTED --------
      products: [],
      productsAll: [],
      totalProducts: 0,
      pexelsImages: [],
      productQuery: {
        page: 1,
        limit: 12,
        sortBy: "price",
        order: "asc",
        search: "",
      },
      isLoadingProducts: false,
      isLoadingOrders: false,

      setProductQuery: (q) => {
        set((s) => {
          const next = { ...s.productQuery, ...q };
          // If search changed, reset to page 1 (common UX)
          if (q.search !== undefined && q.search !== s.productQuery.search) {
            next.page = 1;
          }
          return { productQuery: next };
        });
        // processProducts synchronously (client-side). UI can debounce the call if needed.
        get().processProducts();
      },
            // processProducts: filter, sort, paginate using productsAll
      processProducts: () => {
        const { productsAll, productQuery, pexelsImages } = get();
        if (!productsAll || productsAll.length === 0) {
          // nothing loaded yet
          set({ products: [], totalProducts: 0 });
          return;
        }
        // 1) filter (case-insensitive substring match on name)
        const normalizedSearch = (productQuery.search || "").trim().toLowerCase();
        const filtered = normalizedSearch
          ? productsAll.filter((p) =>
              (p.name || "").toLowerCase().includes(normalizedSearch)
            )
          : [...productsAll];

        // 2) sort
        const sortBy = productQuery.sortBy;
        const order = productQuery.order === "desc" ? -1 : 1;

        if (sortBy) {
          filtered.sort((a: ProductType, b: ProductType) => {
            const va = a[sortBy as keyof ProductType];
            const vb = b[sortBy as keyof ProductType];

            // numeric compare if both are numbers
            if (typeof va === "number" && typeof vb === "number") {
              return (va - vb) * order;
            }

            // fallback to string compare
            return String(va).localeCompare(String(vb)) * order;
          });
        }

        // 3) paginate
        const limit = productQuery.limit || 12;
        const page = Math.max(1, productQuery.page || 1);
        const totalProducts = filtered.length;
        const start = (page - 1) * limit;
        const pageItems = filtered.slice(start, start + limit);

        // ensure each item has image (in case images are separate)
        const merged = pageItems.map((p, i) => {
          if (p.image) return p;
          const img =
            pexelsImages && pexelsImages.length
              ? `${pexelsImages[i % pexelsImages.length].src.large}?auto=compress&fit=crop&w=400&h=400`
              : undefined;
          return { ...p, image: img || p.image || FALLBACK_IMAGE};
        });

        set({ products: merged, totalProducts });
      },

      // setPexelsImages: (images) => set({ pexelsImages: images }),

       // -------------------------
      // Fetch all products once and pexels images
      // -------------------------
      fetchProductsAll: async () => {
        try {
          set({ isLoadingProducts: true });

          // fetch products (all)
          const res = await fetch(`${API}/products`);
          if (!res.ok) throw new Error("Failed to fetch products from API");
          const productsJson: ProductType[] = await res.json();

          // fetch pexels images (optional)
          let pexelsPhotos: PexelsPhoto[] = [];
          try {
            const pxRes = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                PEXELS_QUERY
              )}&per_page=${PEXELS_PER_PAGE}`,
              {
                headers: { Authorization: import.meta.env.VITE_PEXELS_KEY },
              }
            );
            if (pxRes.ok) {
              const pxJson = await pxRes.json();
              pexelsPhotos = pxJson.photos || [];
              set({ pexelsImages: pexelsPhotos });
            }
          } catch (pxErr) {
            // ignore pexels failure — we still use API products
            console.warn("Pexels fetch failed", pxErr);
          }

          // merge images deterministically
          const mergedAll = productsJson.map((p, i) => ({
            ...p,
            image:
              p.image ||
              (pexelsPhotos.length
                ? `${pexelsPhotos[i % pexelsPhotos.length].src.large}?auto=compress&fit=crop&w=400&h=400`
                : FALLBACK_IMAGE),

          }));

          set({ productsAll: mergedAll });

          // initial process (this will populate products and totalProducts)
          get().processProducts();
        } catch (err) {
          console.error("fetchProductsAll error:", err);
          set({ productsAll: [], products: [], totalProducts: 0 });
        } finally {
          set({ isLoadingProducts: false });
        }
      },


      // -------------------------
      // Cart helpers
      // -------------------------
      cart: [],
      totalItems: () => get().cart.reduce((s, i) => s + i.qty, 0),
      totalCostFormatted: () => {
        const total = get().cart.reduce((sum, i) => sum + i.qty * i.price, 0);
        return total;
      },
      addToCart: (item) =>
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
        }),
      removeFromCart: (sku) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.sku !== sku),
        })),
      setQty: (sku, qty) =>
        set((state) => ({
          cart: state.cart.map((i) => (i.sku === sku ? { ...i, qty } : i)),
        })),
      clearCart: () => set({ cart: [] }),

      // -------------------------
      // User
      // -------------------------
      user: null,
      setUser: (u) => set({ user: u }),

      // -------------------------
      // Orders
      // -------------------------
      orders: [],
      lastCreatedOrderId: null,
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
          // optionally clear cart locally
          set({ cart: [] });
          return newOrder.id ?? null;
        } catch (err) {
          console.error("createOrder error:", err);
          return null;
        }
      },

      fetchOrders: async () => {
        try {
          set({ isLoadingOrders: true });
          const res = await fetch(`${API}/orders`);
          if (!res.ok) throw new Error("Failed to fetch orders");
          const data: Order[] = await res.json();
          set({ orders: data });
        } catch (err) {
          console.error("fetchOrders error:", err);
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
          console.error("fetchOrderById error:", err);
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
            orders: get().orders.map((o) => (o.id === id ? updated : o)),
          });
          return true;
        } catch (err) {
          console.error("updateOrder error:", err);
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
          console.error("deleteOrder error:", err);
          return false;
        }
      },
      favorites: [],
      toggleFavorite: (sku) => set((s) => {
        const exists = s.favorites.includes(sku);
        return { favorites: exists ? s.favorites.filter(x => x !== sku) : [...s.favorites, sku] };
      }),
      isFavorite: (sku) => get().favorites.includes(sku),
    }),
    {
      name: "watchme_store",
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        orders: state.orders,
        lastCreatedOrderId: state.lastCreatedOrderId,
        favorites: state.favorites,
        // note: don't persist productsAll or productQuery to avoid stale data between machines
      }),
    }
  )
);

export default useStore;