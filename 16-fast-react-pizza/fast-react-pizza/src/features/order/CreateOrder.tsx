import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import type { ActionFunction } from "react-router-dom";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { getUser, getUserPosition, provideAddress } from "../user/userSlice";
import { clearCart, getCart, getCartTotals } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import { store } from "../../store/store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";

export interface ICreateOrderErrors {
  phone?: string;
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData) as Record<string, string>;
  console.log("Checkbox value: ", data.priority);

  const order: IOrderRequest = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
    position: data.position,
  };

  console.log(order);

  const errors: ICreateOrderErrors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please provide a valid phone number.";
  }

  if (Object.keys(errors).length > 0) return errors;

  console.log("Start submit");
  const { id } = await createOrder(order);
  console.log("Submit completed");

  store.dispatch(clearCart());

  return redirect(`/order/${id}`);
};

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { price } = useAppSelector(getCartTotals);
  const {
    address,
    status: addressStatus,
    userName,
    error: addressError,
  } = useAppSelector(getUser);
  const errors = useActionData() as ICreateOrderErrors | undefined;
  // const { getPosition, address } = useGeolocation();
  const dispatch = useAppDispatch();
  const isLoadingAddress = addressStatus === "loading";
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const { cart } = useAppSelector(getCart);
  const position = useAppSelector(getUserPosition);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={userName}
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="w-full input" />
            {errors?.phone && (
              <p className="p-2 mt-2 text-xs text-red-700 bg-red-100 rounden-md">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address || ""}
              className="w-full input"
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="p-2 mt-2 text-xs text-red-700 bg-red-100 rounden-md">
                {addressError}
              </p>
            )}
          </div>
          {!address && (
            <span className="absolute right-[5px] z-50 top-[5px]">
              <Button
                action={() => {
                  dispatch(provideAddress());
                }}
                type="small"
                disabled={isLoadingAddress}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="w-6 h-6 accent-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-hidden focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing your Order..."
              : `Order now for ${formatCurrency(
                  withPriority ? price * 1.2 : price
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
