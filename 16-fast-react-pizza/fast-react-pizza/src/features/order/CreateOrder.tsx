// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import type { ActionFunction } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

export interface ICreateOrderErrors {
  phone?: string;
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
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
];

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData) as Record<string, string>;

  const order: IOrderRequest = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  console.log(order);

  const errors: ICreateOrderErrors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please provide a valid phone number.";
  }

  if (Object.keys(errors).length > 0) return errors;

  /*   console.log("Start submit");
  const { id } = await createOrder(order);
  console.log("Submit completed");

  return redirect(`/order/${id}`); */
};

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const errors = useActionData() as ICreateOrderErrors | undefined;

  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input" />
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

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="w-full input"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="w-6 h-6 accent-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-hidden focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing your Order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
