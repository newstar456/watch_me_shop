import { useStore } from "../store/useStore";
// import { useEffect } from "react";

const Pagination = () => {

  const { productsAll, productQuery, setProductQuery } = useStore();
  const totalPages = Math.ceil(productsAll.length / 12);
  const maxVisiblePages = 2;
  let startPage = Math.max(1, productQuery.page - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;
  if(endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  const goToPage = (page: number) => setProductQuery({ page });

  const nextPage = () => {
    if (productQuery.page < totalPages) {
      setProductQuery({ page: productQuery.page + 1 });
    }
  };

  const prevPage = () => {
    if (productQuery.page > 1) {
      setProductQuery({ page: productQuery.page - 1 });
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, [productQuery.page, productQuery.sortBy, productQuery.order, productQuery.search]);

  return (
    <div className="flex justify-center items-center gap-4 py-6!">
      <button
        className="px-4! py-2! bg-gray-700 text-white rounded disabled:bg-gray-100 font-extralight hover:cursor-pointer flex justify-center align-middle gap-2"
        disabled={productQuery.page === 1}
        onClick={prevPage}
      >
        <span className="block">◀</span>
        <span className="block">prev</span>
      </button>
      {startPage > 1 && (
        <>
          <button onClick={() => goToPage(1)} disabled={productQuery.page === 1} className="px-4! py-2! bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 font-extralight hover:cursor-pointer">
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}
    {pages.map((page) => (
        <button
          key={page}
          disabled={productQuery.page === page}
          className="px-4! py-2! bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 font-extralight hover:cursor-pointer"
          onClick={() => goToPage(page)}
        >
          {page }
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={productQuery.page === totalPages}
            className="px-4! py-2! bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 font-extralight hover:cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}      
      <button
        disabled={productQuery.page === totalPages}
        className="px-4! py-2! bg-gray-700 text-white rounded font-extralight hover:cursor-pointer flex justify-center align-middle gap-2"
        onClick={nextPage}
      >
      <span className="block">▶</span>
      <span className="block">next</span>
      </button>
    </div>
  );
};

export default Pagination;
