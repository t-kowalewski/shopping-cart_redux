import { createSlice } from '@reduxjs/toolkit';

const initState = {
  products: [],
  totalQuantity: 0,
  totalToPay: 0,
}; // {title: 'Test Item', quantity: 1, price: 6, total: 6}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    // ADD ITEM TO CART - we pass item {title: 'Test Item', quantity: 1, price: 6, total: 6}
    addToCart(state, action) {
      const existingItemIndex = state.products.findIndex(
        (item) => item.title === action.payload.title
      );

      let updProducts;

      if (existingItemIndex !== -1) {
        updProducts = [...state.products];
        updProducts[existingItemIndex] = {
          ...updProducts[existingItemIndex],
          quantity: updProducts[existingItemIndex].quantity + 1,
          total: updProducts[existingItemIndex].total + action.payload.price,
        };
      } else {
        updProducts = [...state.products, action.payload];
      }

      state.products = updProducts;

      // logic to calc totalQuantity
      state.totalQuantity = updProducts.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      // logic to calc totalToPay
    },

    // DELETE ITEM FROM CART - we pass item object (based on 'products array')
    delFromCart(state, action) {
      const remItemIndex = state.products.findIndex(
        (item) => item.title === action.payload.title
      );

      const updProduct = {
        ...state.products[remItemIndex],
        quantity: state.products[remItemIndex].quantity - 1,
        total: state.products[remItemIndex].total - action.payload.price,
      };

      const updProducts = [...state.products];

      if (updProduct.quantity < 1) {
        updProducts.splice(remItemIndex, 1);
      } else {
        updProducts[remItemIndex] = updProduct;
      }

      // logic to calc totalQuantity
      state.totalQuantity--;

      // logic to calc totalToPay

      state.products = updProducts;
    },
  },
});

export const cartActions = cartSlice.actions;
