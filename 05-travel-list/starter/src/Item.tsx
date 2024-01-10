import { iItem } from "./itemsData";

export default function Item({
  item,
  deleteHandler,
  packHandler,
}: {
  item: iItem;
  deleteHandler(itemId: string): void;
  packHandler(itemId: string): void;
}) {
  // skip render on deleted items
  if (item.deleted) return;

  return (
    <li>
      <input
        type="checkbox"
        name="isPacked"
        id={item.id}
        checked={item.packed}
        onChange={() => packHandler(item.id)}
      />
      <span>{item.quantity}</span>
      <span>{item.description}</span>
      <button onClick={() => deleteHandler(item.id)}>&times;</button>
    </li>
  );
}
