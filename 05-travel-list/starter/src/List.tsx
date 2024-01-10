import Item from "./Item";
import { iItem } from "./itemsData";

export default function List({ list }: { list: iItem[] }) {
  const itemList = list.map((item) => <Item {...item} key={item.id} />);

  return (
    <div className="list">
      <ul>{itemList}</ul>
    </div>
  );
}
