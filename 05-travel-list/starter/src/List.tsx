import { items } from "./itemsData";
import Item from "./Item";
import { globalState } from "./App";

export default function List() {
  const list = globalState.getList();

  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item {...item} />
        ))}
      </ul>
    </div>
  );
}
