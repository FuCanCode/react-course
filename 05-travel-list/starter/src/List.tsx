import { useState } from "react";
import Item from "./Item";
import { iItem } from "./itemsData";

export default function List({
  list,
  deleteHandler,
  packHandler,
}: {
  list: iItem[];
  deleteHandler(itemId: number): void;
  packHandler(itemId: number): void;
}) {
  type SortBy = "input" | "description" | "packed";
  const [sortBy, setSortBy] = useState<SortBy>("input");

  const itemList = list.map((item) => (
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
    </div>
  );
}
