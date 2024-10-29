import { configureStore } from "@reduxjs/toolkit";
import { carsApi } from "./carsApi";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    themeRed: themeReducer,
    userRed: userReducer,
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(carsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
