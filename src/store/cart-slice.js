import { createSlice } from '@reduxjs/toolkit';

const initState = {
  products: [], // {title: 'Test Item', quantity: 1, price: 6, total: 6}
  totalQuantity: 0,
  totalToPay: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    // ADD ITEM TO CART - we pass item {id: 'p1', title: 'Test Item', price: 6}
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
        updProducts = [
          ...state.products,
          {
            id: action.payload.id,
            title: action.payload.title,
            quantity: 1,
            price: action.payload.price,
            total: action.payload.price,
          },
        ];
      }

      state.products = updProducts;

      // logic to calc totalQuantity
      state.totalQuantity++;

      // logic to calc totalToPay
    },

    // DELETE ITEM FROM CART - we pass id
    delFromCart(state, action) {
      const remItemIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );

      const updProduct = {
        ...state.products[remItemIndex],
        quantity: state.products[remItemIndex].quantity - 1,
        total:
          state.products[remItemIndex].total -
          state.products[remItemIndex].price,
      };

      const updProducts = [...state.products];

      if (updProduct.quantity < 1) {
        updProducts.splice(remItemIndex, 1);
      } else {
        updProducts[remItemIndex] = updProduct;
      }

      state.products = updProducts;

      // logic to calc totalQuantity
      state.totalQuantity--;

      // logic to calc totalToPay
    },
  },
});

export const cartActions = cartSlice.actions;
