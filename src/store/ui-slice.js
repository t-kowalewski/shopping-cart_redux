import { createSlice } from '@reduxjs/toolkit';

const initState = {
  showCart: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initState,
  reducers: {
    // SHOW AND HIDE CART
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const uiActions = uiSlice.actions;
