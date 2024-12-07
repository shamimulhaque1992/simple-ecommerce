import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

// Configure the Redux store with a cart reducer
export const store = configureStore({
  reducer: {
    cart: cartReducer, // The cart slice reducer handles the cart-related state
  },
});

// Export RootState type for selecting data from the store
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;
