import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  phone: string;
  address: string;
}

const userSlice = createSlice({
  initialState: "",
  name: "userSlice",
  reducers: null,
});
