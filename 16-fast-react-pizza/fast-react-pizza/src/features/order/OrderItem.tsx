import { formatCurrency } from "../../utils/helpers";

interface OrderItemProps {
  item: ICartItemResponse;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
}

function OrderItem(props: OrderItemProps) {
  const { item, isLoadingIngredients, ingredients } = props;
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex justify-between gap-4 text-sm items-between">
        <div className="space-y-3">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        {ingredients && <p className="italic capitalize font-light">{ingredients.join(", ")}</p>}
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
