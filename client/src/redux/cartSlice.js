import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { id, name, price, quantity }
  },
  reducers: {
    addItemsToCart(state, action) {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemsToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
