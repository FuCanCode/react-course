import { useAppDispatch } from "../../lib/hooks";
import Button from "../../ui/Button";
import { deletePizza } from "./cartSlice";

export default function DeleteItemButton({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch();

  return (
    <Button type="small" action={() => dispatch(deletePizza({ id: pizzaId }))}>
      delete
    </Button>
  );
}
