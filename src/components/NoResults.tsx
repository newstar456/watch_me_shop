
export default function NoResults({query}:{query?:string}) {
  return (
    <div className="text-center py-12!">
      <h2 className="text-2xl font-semibold mb-2!">No results</h2>
      <p className="text-sm text-gray-300">
        {query ? `No products found for "${query}".` : "No products found."}
      </p>
    </div>
  );
}

