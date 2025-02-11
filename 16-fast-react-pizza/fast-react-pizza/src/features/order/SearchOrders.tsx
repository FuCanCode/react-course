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
      />
      {results.length !== 0 && results.map((r) => <p>{r.customer}</p>)}
    </form>
  );
}

export default SearchOrders;
