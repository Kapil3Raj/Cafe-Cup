// filepath: c:\Users\KAPIL\OneDrive\Desktop\Projects\Cafe Cup\client\src\redux\store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;