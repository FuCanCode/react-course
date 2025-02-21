import { useState } from "react";
import mockOrders from "./mockedOrders";
import { useNavigate } from "react-router-dom";

function SearchOrders() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = mockOrders.filter((order) => {
    if (query !== "") return order.id.includes(query);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return

    navigate(`/order/${query}`)
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="&#128269; Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 text-sm transition-all duration-300 bg-yellow-100 rounded-full placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 focus:outline-hidden focus:ring-2 focus:ring-opacity-50 focus:ring-yellow-500"
      />
      {results.length !== 0 && results.map((r) => <p>{r.customer}</p>)}
    </form>
  );
}

export default SearchOrders;
