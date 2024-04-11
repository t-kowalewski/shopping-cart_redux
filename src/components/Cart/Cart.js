import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector((store) => store.products);
  const cartIsEmpty = cartItems.length === 0;

  //  add logic to show text for empty cart

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>

      <ul>
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
        {cartItems.map((item) => {
          return <CartItem key={item.title} item={{ ...item }} />;
        })}
      </ul>
    </Card>
  );
};

export default Cart;
