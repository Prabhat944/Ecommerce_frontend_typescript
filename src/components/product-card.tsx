
import { CartItem } from '../types/types';
import { FaHeart, FaPlus } from 'react-icons/fa';
import { server } from '../redux/store';
import Button from '../utils/Button';

type ProductsProps = {
    productId:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler:(cartItem:CartItem)=>string | undefined;
};

const ProductCard = ({
    productId,
    price,
    name,
    photo,
    stock,
    handler
}:ProductsProps) => {
  return (
    <div className='product-card'>
      <div className='product-card-top'>
        <FaHeart />
      </div>
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <Button onClick={()=>handler({productId, price, name, photo, stock, quantity:1})} text={"Add to cart"} />
      </div>
    </div>
  )
}

export default ProductCard
