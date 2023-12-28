import Item from "./Item";
import { iItem } from "./itemsData";

export default function List({ list }: { list: iItem[] }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
