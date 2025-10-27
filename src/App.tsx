import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import SubmitOrderForm from "./components/SubmitOrderForm";


function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
       <Header/>
        <main className="grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit-order" element={<SubmitOrderForm />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer viewCart={false} />
      </div>
    </Router>
  )
}

export default App;
