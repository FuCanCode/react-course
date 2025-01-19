import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
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
      <p>{menu[0].name}</p>
    </>
  );
}

export default Menu;
