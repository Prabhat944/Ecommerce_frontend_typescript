import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './redux/api/userAPI';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import Loader from './components/loader';
import Header from './components/header';
import ProtectedRoute from './components/protected-route';
import { RootState } from './redux/store';
import Footer from './components/footer';

const Home = lazy(()=>import("./pages/home"));
const Search = lazy(()=>import("./pages/search"));
const Cart = lazy(()=>import("./pages/cart"));
const Login = lazy(()=>import("./pages/login"));
const NewProduct = lazy(()=>import("./pages/admin/management/newProduct"));
const Shipping = lazy(()=>import("./pages/shipping"));
const NotFound = lazy(()=>import("./pages/not-found"));
const Orders = lazy(()=>import("./pages/orders"));
const Checkout = lazy(() => import("./pages/checkout"));
const OrderDetails = lazy(()=>import("./pages/order-details"));

const Dashboard = lazy(()=>import("./pages/admin/dashboard"));
const Products = lazy(()=>import("./pages/admin/products"));
const Customers = lazy(()=>import("./pages/admin/customers"));
const Transaction = lazy(()=>import("./pages/admin/transaction"));
const Barcharts = lazy(()=>import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(()=>import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(()=>import("./pages/admin/charts/linecharts"));

const ProductManagement = lazy(()=>import("./pages/admin/management/productmanagement"));

function App() {
  const {user, loading} = useSelector((state:RootState)=>state.userReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      try{
      if(user){
        const data = await getUser(user.uid);
        console.log("tag",user,data)
        dispatch(userExist(data.user));
      }else dispatch(userNotExist());
    }catch(err){
        console.log("erro",err);
        toast.error("something went wrong")
        dispatch(userNotExist());
      }
    })
  
  },[]);

  return loading ? (<Loader />) :(
    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Not Logged in Route */}
          <Route path="/login" element={
          <ProtectedRoute isAuthenticated={user ? false : true}>
            <Login/>
          </ProtectedRoute>} />

          {/* Logged in User Routes */}
          {/* <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}> */}
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order/:id' element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          {/* </Route> */}

          {/* Admin Routes */}
          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === 'admin' ? true : false} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Logged in user routes */}
            {/* <Route element={<ProtectedRoute isAuthenticated={user?true:false}/>} > */}
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* </Route> */}
             {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer user={user}  />
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
