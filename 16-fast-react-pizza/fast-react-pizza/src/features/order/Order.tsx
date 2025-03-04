// Test ID: IIDSAT

import { LoaderFunction, useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.orderId;

  if (!id) throw new Error("The loader did't get an ID.");

  const data: IOrderResponse = await getOrder(id);

  return data;
};

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  /* const [menu, setMenu] = useState<IMenu>();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!menu && !fetcher.data) {
      fetcher.load("/menu");
    } else {
      console.log(fetcher.data);
    }
  }, [fetcher]);

  console.log(menu); */

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData() as IOrderResponse;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-red-500 rounded-full text-red-50">
              Priority
            </span>
          )}
          <span className="px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-green-500 rounded-full text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 bg-stone-200">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="border-t border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="px-6 py-5 space-y-2 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default Order;
