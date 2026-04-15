import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export type AppDispatch = typeof store.dispatch;