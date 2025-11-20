import { ProductType } from "../types";
import { ReactElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../store/useStore";
import { Heart } from 'lucide-react';

type ProductProps = {
    product: ProductType,
    inCart: boolean,
  }

const Product = ({product, inCart}:ProductProps ): ReactElement => {

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.03", "0.2 start"], 
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]); 
  const addToCart = useStore((store) => store.addToCart);
  const toggleFavorite = useStore(s => s.toggleFavorite);
  const isFavorite = useStore(s => s.isFavorite);
  const isFav = isFavorite(product.sku);
  const onAddToCart = () => {
    addToCart({ sku: product.sku, name: product.name, price: product.price, qty: 1, image: product.image });
  }

  const content = 
    <motion.article 
      ref={ref}
      style={{opacity}}
      initial={{ opacity: 0.5, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.1 }}
      className="bg-white rounded-b-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col h-80 p-2! relative">
      <div className='w-5 h-5 absolute top-8 right-10 z-99999 cursor-pointer' onClick={() => toggleFavorite(product.sku)}>{isFav ? <Heart size={24} color="orange" fill="orange"/> : <Heart size={24} color="orange" />}</div>
      <div className="relative bg-gray-100 shrink-0 h-60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-60! object-cover"
          onError={(e) => {
            e.currentTarget.src ="https://placehold.co/400x400?text=No+Image"
          }}
        />
      </div>
      <div className="flex flex-row justify-between grow p-2! items-center text-center h-20">
        <div>
          <h3 className="font-semibold text-red-800 text-[14px] truncate w-full mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-[14px] text-start">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
            {inCart ? " ✔️" : ""}
          </p>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-4 bg-red-900 hover:bg-red-800 text-white text-[14px]! rounded-sm px-2! py-1! transition h-8! w-25!"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  return content;
}

export default Product;

// function areProductsEqual({product: prevProduct, inCart: prevInCart}: ProductProps, {product: nextProduct, inCart: nextInCart}: ProductProps){
//   return (
//     Object.keys(prevProduct).every(key =>{
//         return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
//     }) && prevInCart === nextInCart
//   )
// }

// const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

// export default MemoizedProduct