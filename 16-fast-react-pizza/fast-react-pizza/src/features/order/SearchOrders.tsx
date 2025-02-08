import { useState } from "react";
import mockOrders from "./mockedOrders";

function SearchOrders() {
  const [query, setQuery] = useState("");

  const results = mockOrders.filter((order) => {
    if (query !== "") return order.id.includes(query);
  });

  return (
    <div>
      <input
        type="text"
        placeholder="&#128269; Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length !== 0 && results.map((r) => <p>{r.customer}</p>)}
    </div>
  );
}

export default SearchOrders;
