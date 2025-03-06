import { ActionFunction, useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

export const action: ActionFunction = async ({ params }) => {
  const id = params.orderId!;

  await updateOrder(id, { priority: true });

  return null;
};

export default function UpdateOrder({ order }: { order: IOrderResponse }) {
  const isPriority = order.priority;
  const fetcher = useFetcher();

  if (isPriority) return null;

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}
