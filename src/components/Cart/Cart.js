import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector((store) => store.products);
  const cartIsEmpty = cartItems.length === 0;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartIsEmpty ? (
        <p>No Items</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            return <CartItem key={item.title} item={{ ...item }} />;
          })}
        </ul>
      )}
    </Card>
  );
};

export default Cart;
