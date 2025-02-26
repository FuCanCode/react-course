import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const initialState = {
  cart: [
    // TEST DATA
    // {
    //   pizzaId: 99,
    //   name: "Meat Maniac",
    //   quantity: 3,
    //   unitPrice: 11,
    //   totalPrice: 33,
    // },
  ] as ICart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<ICartItem>) => {
      state.cart.push(action.payload);
    },

    deletePizza: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload.id,
      );
    },

    increasePizzaQantity: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const pizza = state.cart.find((pizza) => pizza.pizzaId === id);

      if (!pizza) return;

      pizza.quantity++;
      pizza.totalPrice += pizza.unitPrice;
    },

    decreasePizzaQantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const pizza = state.cart.find((pizza) => pizza.pizzaId === id);

      if (!pizza) return;

      if (pizza.quantity > 1) {
        pizza.quantity--;
        pizza.totalPrice -= pizza.unitPrice;
      } else {
        // Fancy alternative
        cartSlice.caseReducers.deletePizza(state, action);

        // My way
        // state.cart = state.cart.filter((pizza) => pizza.pizzaId !== id);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addPizza,
  deletePizza,
  increasePizzaQantity,
  decreasePizzaQantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state: RootState) => state.cart;

export const getCurrentQuantityById =
  ({ id }: { id: number }) =>
  (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCartTotals = createSelector(getCart, (cart) =>
  cart.cart.reduce(
    (sum, curPizza) => ({
      pizzas: sum.pizzas + curPizza.quantity,
      price: sum.price + curPizza.totalPrice,
    }),
    { pizzas: 0, price: 0 },
  ),
);

/* export const selectCartTotals = (state: RootState) => {
  console.log("Selector triggered");
  return state.cart.cart.reduce(
    (sum, curPizza) => {
      return {
        pizzas: sum.pizzas + curPizza.quantity,
        price: sum.price + curPizza.totalPrice,
      };
    },
    { pizzas: 0, price: 0 },
  );
}; */

export default cartSlice.reducer;
