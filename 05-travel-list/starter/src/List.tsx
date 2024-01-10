import Item from "./Item";
import { iItem } from "./itemsData";

export default function List({
  list,
  deleteHandler,
  packHandler,
}: {
  list: iItem[];
  deleteHandler(itemId: string): void;
  packHandler(itemId: string): void;
}) {
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
