import { createSlice } from '@reduxjs/toolkit';

const initState = {
  showCart: false,
  notification: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initState,
  reducers: {
    // SHOW AND HIDE CART
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    // SET NOTIFICATION
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
