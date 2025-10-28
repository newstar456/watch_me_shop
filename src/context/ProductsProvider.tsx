import { createContext, ReactElement, useEffect, useState } from "react";


export type ProductType = {
    sku:string,
    name: string,
    price: number,
    image: string;
}

export type UseProductsContextType = { 
    products: ProductType[], 
    loading?: boolean, 
    error?: string 
}

const initContextState: UseProductsContextType = { products: [], loading: true }
const ProductsContext = createContext<UseProductsContextType>(initContextState)
type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    // const [error, setError] = useState<string|undefined>(undefined)

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch("https://6900d632ff8d792314bbb519.mockapi.io/api/products");
          const json = await res.json();
          const pexelsRes = await fetch(
           "https://api.pexels.com/v1/search?query=watches&per_page=30",
            {
              headers: { Authorization: import.meta.env.VITE_PEXELS_KEY }
            }
          )
          const pexelsData = await pexelsRes.json();
          const merged = json.map((p:ProductType, i:number) => ({
            ...p,
            image: `${pexelsData.photos[i % pexelsData.photos.length].src.large}?auto=compress&fit=crop&w=400&h=400`
          }))

          setProducts(merged)
        } catch (err) {
          console.error("Error fetching products:", err)
        }
      }
      fetchProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext
