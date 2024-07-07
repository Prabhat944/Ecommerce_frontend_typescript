import { useMemo, useState } from 'react'
import ProductCard from '../components/product-card'
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI'
import { useDispatch } from 'react-redux';
import { CartItem } from '../types/types';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/reducer/cartReducer';
import { CustomError } from '../types/api-types';
import { Skeleton } from '../components/loader';
import SelectDropdown from '../utils/SelectDropdown';

const orderOptions = [
  { value: '', label: 'None' },
  { value: 'asc', label: 'Price (Low to High)' },
  { value: 'dsc', label: 'Price (High to Low)' },
];





const Search = () => {
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState("");
  const [maxPrice,setMaxPrice] = useState(100000);
  const [category,setCategory] = useState("");
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();
  const {data:categoriesResponse,isLoading:loadingCategories,isError,error} = useCategoriesQuery("");
  const {data:searchedData,isLoading:productLoading,isError:productIsError,error:productError} = useSearchProductsQuery({
    search,sort,category,page,price:maxPrice
  });

  const categoryList = useMemo(()=>{
    const list = [{ value:'', label: "All" }]
    if(!categoriesResponse?.categories) return list;
    categoriesResponse?.categories?.map((item)=>{
      list.push({ value:item, label: item.toUpperCase() })
    } );
    return list;
  },[categoriesResponse]);

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart")
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if(productIsError){
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className='product-search-page'>
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input 
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e)=>setMaxPrice(Number(e.target.value))} 
            style={{background :`linear-gradient(to right, rgba(46,46,46,0.8) ${(maxPrice/100000)*100}%, rgb(200, 199, 199) ${(maxPrice/100000)*100}%)`}}
            />
        </div>
        <div>
          <h4>Sort</h4>
          <SelectDropdown
            sort={sort}
            setSort={setSort}
            optionList={orderOptions}
          />
        </div>
        <div>
          <h4>Category</h4>
          <SelectDropdown
            sort={category}
            setSort={setCategory}
            optionList={!loadingCategories ? categoryList : []}
          />
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input 
          type="text"
          placeholder='Search by name...'
          value={search}
          onChange={(e)=>setSearch(e.target.value)} 
          />

          {productLoading ? (
            <Skeleton length={10} />
          ) :
           <div className='search-product-list'>
            {searchedData?.products.map((item)=>(
              <ProductCard 
                key={item._id}
                productId={item._id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                handler={addToCartHandler}
                photo={item.photo}
              />
            ))}
          </div>}
          
          {searchedData && searchedData.totalPage > 1 && 
          <article>
            <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
            <span>{page} of {searchedData.totalPage}</span>
            <button disabled={!isNextPage} onClick={()=>setPage(prev=>prev+1)}>Next</button>
          </article>}
      </main>
    </div>
  )
}

export default Search
