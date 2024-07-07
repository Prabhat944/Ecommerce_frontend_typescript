import { signOut } from 'firebase/auth';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaHeart, FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { User } from '../types/types';
import { FaCartShopping } from 'react-icons/fa6';

interface PropsType{
    user:User | null;
}
const Footer = ({user}:PropsType) => {
    const [isOpen,setIsOpen] = useState(false);
    
    const logoutHandler = async() => {
        try{
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setIsOpen(false);
        }catch(err){
            toast.error("Sign Out failed");
        }
    };
  return (
    <nav className='footer'>
        <div className='businessLogo'>
            <img src={"/Logo/LogoLight.svg"} alt="" />
            <p>Explore our vibrant online marketplace for a seamless shopping experience!</p>
            <p>Discover curated collections and exclusive deals on our user-friendly ecommerce platform!</p>
        </div>
        <div className='navLinkContainer'>
        <div className='social-links'>
        <Link onClick={()=>setIsOpen(false)} to={"/"}>
        <img src={"/16px/Facebook.svg"} alt="" />
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/about"}>
        <img src={"/16px/Instagram.svg"} alt="" />
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/Contact"}>
        <img src={"/16px/Twitter.svg"} alt="" />
        </Link>
        </div>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <span>
            <FaSearch /> Search
        </span>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/favourite"}>
        <span>
           <FaHeart /> Favourites
        </span>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
        <span>
           <FaCartShopping /> Go to cart
        </span>
        </Link>

        {user?._id ? (<button onClick={logoutHandler}>
                    <FaSignOutAlt /> Logout
                </button>)
        : (
            <Link to={"/login"}>
                <FaSignInAlt /> Login
            </Link>
        )}
        </div>
    </nav>
  )
}

export default Footer;
