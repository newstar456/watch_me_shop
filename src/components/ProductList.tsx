import Product from "./Product";
import { ReactElement } from "react";
import { useStore } from "../store/useStore";
import Pagination from "./Pagination";
import ProductSearch from "./ProductSearch";
import ProductSort from "./ProductSort";
import NoResults from "./NoResults";


const ProductList = () => {
    
   const cart = useStore((s) => s.cart);
   const {products, isLoadingProducts} = useStore((s) => s);

    if (isLoadingProducts) return <main className="main main--products"><p>Loading products…</p></main>;
    let pageContent: ReactElement | ReactElement[] = <p className="main main--products">Loading...</p>;

    if(products?.length) {
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.sku === product.sku);

            return (
                <Product 
                    key={product.sku}
                    product={product}
                    inCart={inCart}
                />
            )
        })
    } else {
        return (
            <>
            <ProductSearch />
             <NoResults/>
            </>
           
        )
    }

    const content = (
        <>
            <ProductSearch />
            <ProductSort />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3! pb-12!">
                {pageContent}
            </div>
            <Pagination/>
        </>
    )

  return content;
}

export default ProductList;
