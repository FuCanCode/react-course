import { Link } from "react-router-dom";
import SearchOrders from "../features/order/SearchOrders";

function Header() {
  return (
    <header>
      <Link to={"/"} className="">
        Fast React Pizza Co.
      </Link>
      <SearchOrders />
    </header>
  );
}
export default Header;
