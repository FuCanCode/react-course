import { useAppDispatch } from "../../lib/hooks";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deletePizza } from "./cartSlice";

function CartItem({ item }: { item: ICartItem }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useAppDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-end justify-between sm:items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" action={() => dispatch(deletePizza(pizzaId))}>
          delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
