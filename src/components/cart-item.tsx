import { server } from '../redux/store'
import { Link } from 'react-router-dom'
import { CartItem } from '../types/types';
import { FaTrash } from 'react-icons/fa';

type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void;
    decrementHandler: (cartItem: CartItem) => void;
    removeHandler: (id: string) => void;
  };
const CartItemCard = ({
    cartItem,
    decrementHandler,
    incrementHandler,
    removeHandler,
}:CartItemProps) => {
    const {photo, name, productId, price, quantity} = cartItem;
  return (
    <div className='cart-item'>
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
      </article>

      <div>
        <button onClick={()=>decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={()=>incrementHandler(cartItem)}>+</button>
      </div>
      <span>{`₹${quantity*price}`}</span>
      <button onClick={()=>removeHandler(productId)}><FaTrash /></button>
    </div>
  )
}

export default CartItemCard
