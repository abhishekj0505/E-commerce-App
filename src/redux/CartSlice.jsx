import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQauntity(state, action) {
      state = state.map((item) => {
        if (item.id === action.payload) {
          item.qauntity++;
        }
        return item;
      });
    },
    decrementQauntity(state, action) {
      state = state.map((item) => {
        if (item.qauntity !== 1) {
          if (item.id === action.payload) {
            item.qauntity--;
          }
        }
        return item;
      });
    },
    clearCart(sate){
      return []
    }
  },
});

export const {
  incrementQauntity,
  decrementQauntity,
  addToCart,
  deleteFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
