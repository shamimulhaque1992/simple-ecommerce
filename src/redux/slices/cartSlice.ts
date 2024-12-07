import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for an individual item in the cart
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Interface for the cart state, which holds an array of CartItems
interface CartState {
  items: CartItem[];
}

// Initial state of the cart with an empty items array
const initialState: CartState = {
  items: [],
};

// Create the cart slice with reducers for managing cart actions
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a new item to the cart or update quantity if the item already exists
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },

    // Remove an item from the cart by id
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload); // Filter out the item by id
    },

    // Update the quantity of an existing item in the cart
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; // Update item quantity
      }
    },
  },
});

// Export actions generated from the reducers
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
