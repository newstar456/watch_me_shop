import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useStore } from "../store/useStore";


const ProductSearch = () => {

  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 350);
  const { setProductQuery } = useStore();
//   const {productQuery} = useStore((s) => s);

  useEffect(() => {
    setProductQuery({ search: debouncedQ, page: 1 });
  }, [debouncedQ, setProductQuery]);


  return (
    <div className="px-4 py-4">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default ProductSearch;
