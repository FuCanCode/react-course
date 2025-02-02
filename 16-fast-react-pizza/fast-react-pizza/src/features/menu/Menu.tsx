import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
// import { IMenu } from "../../lib/entities";

export async function loader() {
  const data = await getMenu();

  return data;
}

function Menu() {
  const menu = useLoaderData() as IMenu;

  return (
    <>
      <h1>Menu</h1>
      <ul>
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </>
  );
}

export default Menu;
