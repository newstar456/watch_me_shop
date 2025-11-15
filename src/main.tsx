import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// import { CartProvider } from "./context/CartProvider.tsx";
// import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/watch_me_shop/"> 
      {/* <ProductsProvider> */}
        {/* <CartProvider> */}
          <App />
        {/* </CartProvider> */}
      {/* </ProductsProvider> */}
    </BrowserRouter>
  </StrictMode>
);

