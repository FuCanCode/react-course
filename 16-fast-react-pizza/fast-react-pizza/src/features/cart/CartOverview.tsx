import { Link } from "react-router-dom";
import { useAppSelector } from "../../lib/hooks";
import { getCartTotals } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  // Own version of getting totals
  // const { cart } = useAppSelector(selectCart);

  // const totals = cart.reduce(
  //   (sum, curr) => {
  //     return {
  //       pizzas: sum.pizzas + curr.quantity,
  //       price: sum.price + curr.totalPrice,
  //     };
  //   },
  //   { pizzas: 0, price: 0 },
  // );

  const { pizzas, price } = useAppSelector(getCartTotals);

  if (!pizzas) return null;

  return (
    <div className="flex items-center justify-between p-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base animate-slide-up">
      <p className="space-x-4 sm:space-x-6 text-stone-300">
        <span>{pizzas} pizzas</span>
        <span>{formatCurrency(price)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
