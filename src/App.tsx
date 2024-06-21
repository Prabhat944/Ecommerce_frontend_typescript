import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './redux/api/userAPI';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import Loader from './components/admin/loader';
import Header from './components/admin/header';
import ProtectedRoute from './components/admin/protected-route';

const Home = lazy(()=>import("./pages/home"));
const Search = lazy(()=>import("./pages/search"));
const Cart = lazy(()=>import("./pages/cart"));
const Login = lazy(()=>import("./pages/login"));
const NewProduct = lazy(()=>import("./pages/admin/management/newProduct"));
const Shipping = lazy(()=>import("./pages/not-found"));
const NotFound = lazy(()=>import("./pages/shipping"));
const Orders = lazy(()=>import("./pages/orders"));
const OrderDetails = lazy(()=>import("./pages/order-details"));
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
        toast.error(err?.response?.data?.message || "something went wrong")
        dispatch(userNotExist());
      }
    })
  
  },[]);

  return loading ? (<Loader />) :(
    <Router>
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
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order/:id' element={<OrderDetails />} />
          </Route>

          {/* Admin Routes */}
          {/* <Route element={<ProtectedRoute isAuthenticated={user ? true : false} adminOnly={true} admin={user?.role === 'admin' ? true : false} />}> */}
            <Route path="/admin/product/new" element={<NewProduct />} />
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
