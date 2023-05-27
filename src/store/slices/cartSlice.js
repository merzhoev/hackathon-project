import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem('cartProducts')) ?? []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.products.push(action.payload)

      const products = JSON.parse(localStorage.getItem('cartProducts')) ?? []
      products.push(action.payload)

      localStorage.setItem('cartProducts', JSON.stringify(products))
    },
    clearCart: (state) => {
      state.products = []

      localStorage.setItem('cartProducts', JSON.stringify([]))
    },
    removeOneCard: (state, action) => {
      state.products = state.products.filter(({ id }) => id !== action.payload)

      let products = JSON.parse(localStorage.getItem('cartProducts')) ?? []
      products = products.filter(({ id }) => id !== action.payload)
      localStorage.setItem('cartProducts', JSON.stringify(products))
    },
    plusProduct: (state, action) => {
      const item = state.products.find(({ id }) => id === action.payload)

      if (!item) {
        return
      }

      item.amount++

      let products = JSON.parse(localStorage.getItem('cartProducts')) ?? []
      const productItem = products.find(({ id }) => id === action.payload)
      productItem.amount = item.amount
      localStorage.setItem('cartProducts', JSON.stringify(products))
    },
    minusProduct: (state, action) => {
      const item = state.products.find(({ id }) => id === action.payload)

      if (!item) {
        return
      }

      item.amount = Math.max(1, item.amount - 1)

      let products = JSON.parse(localStorage.getItem('cartProducts')) ?? []
      const productItem = products.find(({ id }) => id === action.payload)
      productItem.amount = item.amount
      localStorage.setItem('cartProducts', JSON.stringify(products))
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;