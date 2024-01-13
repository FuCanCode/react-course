import { iItem } from "./itemsData";

export default function Item({
  item,
  deleteHandler,
  packHandler,
}: {
  item: iItem;
  deleteHandler(itemId: number): void;
  packHandler(itemId: number): void;
}) {
  // skip render on deleted items
  if (item.deleted) return;

  return (
    <li>
      <input
        type="checkbox"
        name="isPacked"
        checked={item.packed}
        onChange={() => packHandler(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteHandler(item.id)}>❌</button>
    </li>
  );
}
