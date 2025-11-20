import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import SubmitOrderForm from "./components/SubmitOrderForm";
import { useEffect } from "react";
import { useStore } from "./store/useStore";

function App() {

  // const productQuery = useStore((s) => s.productQuery);
  // const fetchProducts = useStore((s) => s.fetchProducts);
  const fetchProductsAll = useStore((s) => s.fetchProductsAll);
  // const fetchOrders = useStore((s) => s.fetchOrders);
  // const pexelsImages = useStore((s) => s.pexelsImages);
  // const setPexelsImages = useStore((s) => s.loadPexels);

  useEffect(() => {
    // fetchProducts();
    fetchProductsAll();
    // fetchOrders();
    // const loadPexels = async () => {
    //   if (pexelsImages.length > 0) return;

    //   const res = await fetch("https://api.pexels.com/v1/search?query=watches&per_page=30", {
    //     headers: { Authorization: import.meta.env.VITE_PEXELS_KEY }
    //   });

    //   const data = await res.json();
    //   setPexelsImages(data.photos);
    // };

    // loadPexels();
  }, []);

  // useEffect(() => {
  //   if (pexelsImages.length === 0) return; 
  //   // fetchProducts();
  // }, [productQuery.page, productQuery.limit, productQuery.sortBy, productQuery.order, productQuery.search ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/submit-order" element={<SubmitOrderForm />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } /> */}

        </Routes>
      </main>
      <Footer viewCart={false} />
    </div>
  );
}

export default App;

