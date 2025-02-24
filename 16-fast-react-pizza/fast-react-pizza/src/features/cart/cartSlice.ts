import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const initialState = {
  cart: [] as ICart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<ICartItem>) => {
      state.cart.push(action.payload);
    },
    deletePizza: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increasePizzaQantity: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const pizza = state.cart.find((pizza) => pizza.pizzaId === id);

      if (!pizza) return;

      pizza.quantity++;
    },
    decreasePizzaQantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const pizza = state.cart.find((pizza) => pizza.pizzaId === id);

      if (!pizza) return;

      if (pizza.quantity > 1) {
        pizza.quantity--;
      } else {
        state.cart = state.cart.filter((pizza) => pizza.pizzaId !== id);
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
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
