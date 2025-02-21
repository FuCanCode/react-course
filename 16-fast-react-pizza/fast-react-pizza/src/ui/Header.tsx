import { Link } from "react-router-dom";
import SearchOrders from "../features/order/SearchOrders";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex justify-between px-4 py-3 uppercase bg-yellow-400 border-b sm:px-6 border-stone-200">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <SearchOrders />

      <Username />
    </header>
  );
}
export default Header;
