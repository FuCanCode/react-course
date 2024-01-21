import { useState } from "react";
import Item from "./Item";
import { iItem } from "../itemsData";

export default function List({
  list,
  deleteHandler,
  packHandler,
  clearHandler,
}: {
  list: iItem[];
  deleteHandler(itemId: number): void;
  packHandler(itemId: number): void;
  clearHandler(): void;
}) {
  type SortBy = "input" | "description" | "packed";
  const [sortBy, setSortBy] = useState<SortBy>("input");

  const sortFunctions = {
    input: (a: iItem, b: iItem) => b.id - a.id,
    packed: (a: iItem, b: iItem) =>
      Number(a.packed) - Number(b.packed) || b.id - a.id,
    description: (a: iItem, b: iItem) =>
      a.description.localeCompare(b.description) || b.id - a.id,
  };

  const itemList = [...list]
    .sort(sortFunctions[sortBy])
    .map((item) => (
      <Item
        item={item}
        key={item.id}
        deleteHandler={deleteHandler}
        packHandler={packHandler}
      />
    ));

  return (
    <div className="list">
      <ul>{itemList}</ul>
      {list.filter((item) => !item.deleted).length !== 0 && (
        <div className="actions">
          <select
            name="sort"
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="input">sort by input order</option>
            <option value="description">sort by description</option>
            <option value="packed">sort by packed status</option>
          </select>
          <button onClick={clearHandler}>clear list</button>
        </div>
      )}
    </div>
  );
}
