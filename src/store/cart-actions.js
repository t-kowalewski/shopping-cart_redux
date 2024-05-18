import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

// Our custom "thunk", action creator (separate, standalone function)
// SEND CART DATA
export const sendCartData = (cartData) => {
  // we have to return a function instead of an object
  // (like it is in a "built-in" action creators)
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    );

    try {
      const resp = await fetch(
        // link to test db: url/cart.json
        'https://redux-cart-test-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!resp.ok) {
        throw new Error('Failed updating cart');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Done',
          message: 'Data successfuly sent',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Failed sending cart data',
        })
      );
    }
  };
};

// FETCH CART DATA
export const getCartData = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        // link to test db: url/cart.json
        'https://redux-cart-test-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      if (!resp.ok) {
        throw new Error('Failed fetching cart data');
      }

      const data = await resp.json();

      if (data) {
        dispatch(
          cartActions.addFetchedItemsToCart({
            ...data,
            products: data.products || [],
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Failed fetching cart data',
        })
      );
    }
  };
};
