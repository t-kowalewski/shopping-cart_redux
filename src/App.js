import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import PRODUCTS from './products';

import { useSelector } from 'react-redux';

function App() {
  const showCart = useSelector((store) => store.ui.showCart);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products products={PRODUCTS} />
    </Layout>
  );
}

export default App;
