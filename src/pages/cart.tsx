import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import CartItemCard from '../components/admin/cart-item';
import { CartItem } from '../types/types';
import toast from 'react-hot-toast';
import { addToCart, calculatePrice, removeCartItem } from '../redux/reducer/cartReducer';

const Cart = () => {
  const {cartItems} = useSelector((state:RootState)=>state.cartReducer);
  const dispatch = useDispatch();

  const incrementHandler = (cartItem:CartItem) => {
    if(cartItem.quantity > cartItem.stock)return toast("maximum quantity added from stock");
    dispatch(addToCart({...cartItem, quantity : cartItem.quantity + 1}))
  };
  const decrementHandler = (cartItem:CartItem) => {
    if(cartItem.quantity <= 1)return removeHandler(cartItem.productId);
    dispatch(addToCart({...cartItem, quantity : cartItem.quantity - 1}))
  };
  const removeHandler = (productId:string) => {
    dispatch(removeCartItem(productId))
  };

  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItems])
  return (
    <div className='cart'>
      <main>
        {cartItems.length>0 ? (
          cartItems?.map((item:any,index)=>(
            <CartItemCard 
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={index}
              cartItem={item}/>
          ))
        ) :(<h1>No Item Added</h1>)}
      </main>
    </div>
  )
}

export default Cart
