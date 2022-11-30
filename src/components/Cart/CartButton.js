import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiAcitons } from '../../store/ur-slice';

const CartButton = (props) => {

  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiAcitons.toggle());
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
