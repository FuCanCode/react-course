import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TYPES /////////////
//////////////////////
interface Customer {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

// INITIAL STATE //
///////////////////
const initialStateCustomer: Customer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare: (fullName: string, nationalID: string) => {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer: (
        state,
        action: PayloadAction<{
          fullName: string;
          nationalID: string;
          createdAt: string;
        }>
      ) => {
        const { createdAt, fullName, nationalID } = action.payload;
        state.createdAt = createdAt;
        state.fullName = fullName;
        state.nationalID = nationalID;
      },
    },

    updateName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;
