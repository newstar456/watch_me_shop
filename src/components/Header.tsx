import { ShoppingCart, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useState } from "react";


const Header = () => {

  const { totalItems, totalCost } = useCart();
  const [viewCart, setViewCart] = useState<boolean>(false)

  return (
    <header className="header flex items-center justify-between px-6! py-3! sm:px-8! md:px-16! lg:px-24! sticky top-0 z-50 bg-linear-to-b from-[#FFF8F7] via-[#FFF8F7]/80  to-transparent backdrop-blur-sm shadow-md">
      <a href="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-30 w-auto rounded-sm" />
      </a>
      <nav className="flex just justify-center align-middle gap-14">
        <Link className="text-gray-800 font-light cursor-pointer" to="/">Home</Link>
        <Link className="text-gray-800 font-light cursor-pointer" to="/about">About Us</Link>
        <Link className="text-gray-800 font-light cursor-pointer" to="/contact">Contact</Link>
        <Link className="text-gray-800 font-light cursor-pointer" to="/faq">FAQ</Link>
      </nav>
      <div className="flex flex-col gap-1 items-end">

        <motion.button
            key={totalItems}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.4 }}
            onClick={() => setViewCart(!viewCart)}
            className="header__cart relative flex items-center justify-center w-11 h-11 md:w-12! md:h-12! transition"
        >
          <AnimatePresence mode="wait" initial={false}>
            {viewCart ? (
              <motion.div
                key="home"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
              <Link to="/"><Home className="w-6 h-6 md:w-10! md:h-10!" /></Link>
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/cart"><ShoppingCart className="w-6 h-6 md:w-10! md:h-10!" /></Link>
              </motion.div>
            )}
          </AnimatePresence>

            {!viewCart && totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -top-1 -right-1 flex items-center justify-center w-5 h- lg:w-6 lg:h-6 rounded-full bg-red-500 text-white text-xs font-bold"
              >
                {totalItems}
              </motion.span>
            )}
        </motion.button>

        <p className="text-sm text-gray-600 text-center w-full">
          <span className="font-semibold">{totalCost}</span>
        </p>
      </div>

    </header>
  );
};

export default Header;
