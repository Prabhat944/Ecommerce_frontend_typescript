import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, server } from '../redux/store';
import CartItemCard from '../components/cart-item';
import { CartItem } from '../types/types';
import toast from 'react-hot-toast';
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../redux/reducer/cartReducer';
import { Link } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
import axios from 'axios';

const Cart = () => {
  const {cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state:RootState)=>state.cartReducer);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false);

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

  useEffect(() => {
    const {token:cancelToken,cancel} = axios.CancelToken.source();

    const timeOutID = setTimeout(()=>{
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken})
      .then((res)=>{
        dispatch(discountApplied(res.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(()=>{
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      })
    },1000);

    return ()=>{
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  },[couponCode]);

  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItems])
  return (
    <div className='cart'>
      <div>
      <main>
      <h1>Shopping Cart</h1>
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
      <aside>
      <p><span>Subtotal:</span> <span>₹{subtotal}</span></p>
      <p><span>Shipping Charges:</span> <span>₹{shippingCharges}</span></p>
      <p><span>Tax:</span> <span>₹{tax}</span></p>
      <p>
          <span>Discount:</span> <span><em className="red"> - ₹{discount}</em></span>
      </p>
      <p>
          <b>Total:</b> <b>₹{total}</b>
      </p>
      <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      {couponCode &&
        (isValidCouponCode ? (
          <span className="green">
            ₹{discount} off using the <code>{couponCode}</code>
          </span>
        ) : (
          <span className="red">
            Invalid Coupon <VscError />
          </span>
        ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
      </div>
    </div>
  )
}

export default Cart
