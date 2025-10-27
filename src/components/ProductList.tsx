import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "./Product";
import { ReactElement } from "react"

const ProductList = () => {
    
    const {dispatch, REDUCER_ACTIONS, cart} = useCart();
    const { products, loading, error } = useProducts();

    if (loading) return <main className="main main--products"><p>Loading products…</p></main>;
    if (error) return <main className="main main--products"><p>Error loading products: {error}</p></main>;

    let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

    if(products?.length) {
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.sku === product.sku);

            return (
                <Product
                    key={product.sku}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                />
            )
        })
    }

    const content = (
        <main 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3! pb-12!">
                {pageContent}
        </main>
    )

  return content;
}

export default ProductList;
