import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getAddress } from "../../services/apiGeocoding";
import { action } from "../order/CreateOrder";

export const provideAddress = createAsyncThunk(
  "user/provideAddress",
  async () => {
    const { address, position } = await fetchAddress();

    return { address, position };
  },
);

interface User {
  userName: string;
  address: string;
  status: "idle" | "loading";
  position: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
  error: string;
}

const initialState: User = {
  userName: "",
  address: "",
  status: "idle",
  error: "",
  position: {
    latitude: undefined,
    longitude: undefined,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(provideAddress.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(provideAddress.fulfilled, (state, action) => {
      state.address = action.payload.address;
      state.position = action.payload.position;
      state.status = "idle";
    });

    builder.addCase(provideAddress.rejected, (state, action) => {
      state.error =
        action.error.message || "Something went wrong on getting the address.";
      state.status = "idle";
    });
  },
});

export const { setName } = userSlice.actions;

export const getUser = (state: RootState) => state.user;
export const getUserName = (state: RootState) => state.user.userName;
export const getUserAddress = (state: RootState) => state.user.address;

export default userSlice.reducer;

function getPosition() {
  return new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
