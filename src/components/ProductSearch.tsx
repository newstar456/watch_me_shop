import { useStore } from "../store/useStore";

const ProductSearch = () => {
    
  const { setProductQuery } = useStore();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setProductQuery({ search: e.target.value, page: 1 });
    // fetchProducts();
  };

  return (
    <div className="px-4 py-4">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleInput}
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default ProductSearch;
