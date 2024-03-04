import { configureStore } from "@reduxjs/toolkit";
import { carsApi } from "./carsApi";

export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(carsApi.middleware),
});
