import { signOut } from 'firebase/auth';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { User } from '../types/types';

interface PropsType{
    user:User | null;
}
const Header = ({user}:PropsType) => {
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
    <nav className='header'>
        <div className='businessLogo'>
            <img src={"/Logo/LogoDark.svg"} alt="" />
        </div>
        <div className='navLinkContainer'>
        <Link onClick={()=>setIsOpen(false)} to={"/"}>
            Home
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/about"}>
            About
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/Contact"}>
            Contact Us
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <span>
            Search... <FaSearch />
        </span>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/favourite"}>
           <img src={"/32px/Favorites.svg"} alt="" />
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
           <img src={"/32px/Cart1.svg"} alt="" />
        </Link>

        {user?._id ? <>
         <button onClick={()=>setIsOpen(prev=>!prev)}>
            <FaUser />
         </button>
         <dialog open={isOpen}>
            <div>
                {user.role === "admin" && (
                    <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"}>
                        Admin
                    </Link>
                )}
                <Link onClick={()=>setIsOpen(false)} to={"/orders"}>
                        Orders
                </Link>
                <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                </button>
            </div>
         </dialog>
        </>
        : (
            <Link to={"/login"}>
                <FaSignInAlt />
            </Link>
        )}
        </div>
    </nav>
  )
}

export default Header;
