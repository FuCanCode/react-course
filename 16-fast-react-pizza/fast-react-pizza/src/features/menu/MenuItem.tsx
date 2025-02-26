import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addPizza, getCurrentQuantityById } from "../cart/cartSlice";
import QantitySelector from "../../ui/QuantitySelector";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import DeleteItemButton from "../cart/DeleteButton";

function MenuItem({ pizza }: { pizza: IPizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const quantity = useAppSelector(getCurrentQuantityById({ id }));
  const dispatch = useAppDispatch();

  const isInCart = quantity > 0;

  const handleAddToCart = () => {
    const item: ICartItem = {
      name,
      pizzaId: id,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addPizza(item));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-end justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {/* If the item is sold out, don't show any buttons */}
          {!soldOut &&
            (!isInCart ? (
              <Button type="small" action={handleAddToCart}>
                add to cart
              </Button>
            ) : (
              <div className="flex items-center gap-3 sm:gap-8">
                <QantitySelector id={id} quantity={quantity} />
                <DeleteItemButton pizzaId={id} />
              </div>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
