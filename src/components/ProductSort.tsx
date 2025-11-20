import { useStore } from "../store/useStore";

const ProductSort = () => {
    
  const { setProductQuery, processProducts } = useStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split("-");
    setProductQuery({ sortBy, order: order as "asc" | "desc" });
    processProducts();
  };

  return (
    <div className="flex justify-end px-4 py-4">
      <select
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
      </select>
    </div>
  );
};

export default ProductSort;
