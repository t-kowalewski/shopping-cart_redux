import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartData, sendCartData } from './store/cart-actions';
import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import PRODUCTS from './products';
import Notification from './components/UI/Notification';

function App() {
  const showCart = useSelector((store) => store.ui.showCart);
  const cart = useSelector((store) => store.cart);
  const notification = useSelector((store) => store.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    let notificationTimeout;

    if (cart.wasChanged) {
      dispatch(sendCartData(cart));

      // logic to hide notification
      notificationTimeout = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 5000);
    }

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}

      <Layout>
        {showCart && <Cart />}
        <Products products={PRODUCTS} />
      </Layout>
    </>
  );
}

export default App;
