import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const cartItemsAmount = useSelector((store) => store.cart.products.length);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsAmount}</span>
    </button>
  );
};

export default CartButton;
