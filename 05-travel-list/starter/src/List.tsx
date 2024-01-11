import { useState } from "react";
import Item from "./Item";
import { iItem } from "./itemsData";

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

  function sortList(sortBy: string): iItem[] {
    switch (sortBy) {
      case "description":
        return list.slice().sort((a, b) => {
          if (a.description < b.description) {
            return -1;
          }
          if (a.description > b.description) {
            return 1;
          }
          return 0;
        });

      case "packed":
        //
        return [
          ...list.filter((item) => !item.packed),
          ...list.filter((item) => item.packed),
        ];
      default:
        return list.slice().sort((a, b) => b.id - a.id);
    }
  }

  const itemList = sortList(sortBy).map((item) => (
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
      {list.length !== 0 && (
        <div>
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
