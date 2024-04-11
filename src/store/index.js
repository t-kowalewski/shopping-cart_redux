import { configureStore, createSlice } from '@reduxjs/toolkit';

const initState = { showCart: false, products: [], totalToPay: 0 }; // {title: 'Test Item', amount: 1, totalPrice: 6}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    // ADD ITEM TO CART - we pass item {title: 'Test Item', amount: 1, totalPrice: 6}
    addToCart(state, action) {
      const existingItemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      let updProducts;

      if (existingItemIndex !== -1) {
        updProducts = [...state.products];
        updProducts[existingItemIndex] = {
          ...updProducts[existingItemIndex],
          amount: updProducts[existingItemIndex].amount + 1,
          totalPrice:
            updProducts[existingItemIndex].totalPrice + action.payload.price,
        };
      } else {
        updProducts = [...state.products, action.payload];
      }

      // logic to calc totalToPay

      state.products = updProducts;
    },

    // DELETE ITEM FROM CART - we pass id & item price {id: 'p1', price: 6}
    delFromCart(state, action) {
      const remItemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      const updProduct = {
        ...state.products[remItemIndex],
        amount: state.products[remItemIndex].amount - 1,
        totalPrice: state.products[remItemIndex].price - action.payload.price,
      };

      const updProducts = [...state.products];

      if (updProduct.amount < 1) {
        updProduct.splice(remItemIndex, 1);
      } else {
        updProducts[remItemIndex] = updProduct;
      }

      // logic to calc totalToPay

      state.products = updProducts;
    },

    // SHOW AND HIDE CART
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

const store = configureStore({ reducer: cartSlice.reducer });

export const cartActions = cartSlice.actions;
export default store;