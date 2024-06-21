import { Link } from 'react-router-dom'
import { Skeleton } from '../components/admin/loader'
import ProductCard from '../components/admin/product-card'
import { CartItem } from '../types/types';
import { useDispatch } from 'react-redux';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/reducer/cartReducer';

const Home = () => {
  const {data, isLoading, isError} = useLatestProductsQuery("");
    const dispatch = useDispatch();
    const addToCartHandler = (cartItem:CartItem) => {
       if(cartItem.stock < 1)return toast.error("Out of Stock");
       dispatch(addToCart(cartItem));
       toast.success("Added to Cart");
    };

    if(isError)toast.error("Cannot Fetch the Products");

  return (
    <div className='home'>
      <section></section>
      <h1>
        Latest Products
        <Link to='/search' className='findmore'>
            More
        </Link>
      </h1>
      <main>
      {/* <Skeleton width="80vw" /> */}
      {isLoading 
      ? <Skeleton width="80vw" /> 
      : data?.products?.map((item)=>(
            <ProductCard
               key={item?._id}
               productId={item?._id}
               name={item?.name}
               price={item?.price}
               stock={item?.stock}
               handler={addToCartHandler}
               photo={item?.photo}
             />
        ))}
        {/* {Array(10).fill({
            productId:"1234567",
            price:99,
            name:"product",
            photo:"https://cdn.shopify.com/s/files/1/0070/7032/files/product_20research.png?v=1702995315",
            stock:5
        }).map((item)=>(
            <ProductCard
               key={item?._id}
               productId={item?._id}
               name={item?.name}
               price={item?.price}
               stock={item?.stock}
               handler={addToCartHandler}
               photo={item?.photo}
             />
        ))} */}
      </main>
    </div>
  )
}

export default Home
