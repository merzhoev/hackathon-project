import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem('cartProducts') ?? []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.products.push(action.payload)
    },
    clearCart: (state) => {
      state.products = []
    },
    removeOneCard: (state, action) => {
      state.products = state.products.filter(({ id }) => id !== action.payload.id)
    },
    plusProduct: (state, action) => {
      const item = state.products.find(({ id }) => id === action.payload)

      if (!item) {
        return
      }

      item.amount++
    },
    minusProduct: (state, action) => {
      const item = state.products.find(({ id }) => id === action.payload)

      if (!item) {
        return
      }

      item.amount = Math.max(0, item.amount - 1)
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;