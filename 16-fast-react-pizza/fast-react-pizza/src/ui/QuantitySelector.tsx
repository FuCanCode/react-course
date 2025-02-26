import {
  decreasePizzaQantity,
  increasePizzaQantity,
} from "../features/cart/cartSlice";
import { useAppDispatch } from "../lib/hooks";
import Button from "./Button";

interface QuantitySelectotProps {
  quantity: number;
  id: number;
}

export default function QantitySelector({
  quantity,
  id,
}: QuantitySelectotProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        action={() => dispatch(decreasePizzaQantity({ id }))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button
        type="round"
        action={() => dispatch(increasePizzaQantity({ id }))}
      >
        +
      </Button>
    </div>
  );
}
