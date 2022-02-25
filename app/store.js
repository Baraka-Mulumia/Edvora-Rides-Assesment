import { configureStore } from "@reduxjs/toolkit";

import ridesReducer from "../features/ride/rideSlice";

export function makeStore() {
  return configureStore({
    reducer: { rides: ridesReducer },
  });
}

const store = makeStore();

export default store;
