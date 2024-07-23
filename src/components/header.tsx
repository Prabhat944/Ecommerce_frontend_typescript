import { signOut } from 'firebase/auth';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { User } from '../types/types';
import { FiMenu } from 'react-icons/fi';

interface PropsType{
    user:User | null;
}
const Header = ({user}:PropsType) => {
    const location = useLocation();
    const [isOpen,setIsOpen] = useState(false);
    const [openMenu,setOpenMenu] = useState(false);
    console.log("tag ",location.pathname === '/')
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
        <div className='menu-list'>
            <FiMenu  onClick={()=>setOpenMenu(prev=>!prev)}/>
        </div>
        <div className={`navLinkContainer ${openMenu ? 'navLinkContainerActive' : ''}`}>
        <Link onClick={()=>setIsOpen(false)} to={"/"}>
            <div style={{color:location.pathname === '/' ? 'rgb(46,46,46)' : 'rgb(200, 199, 199)' }}>Home</div>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/about"}>
        <div style={{color:location.pathname === '/about' ? 'rgb(46,46,46)' : 'rgb(200, 199, 199)' }}>About</div>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/Contact"}>
        <div style={{color:location.pathname === '/Contact' ? 'rgb(46,46,46)' : 'rgb(200, 199, 199)' }}>Contact Us</div>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <span style={location.pathname === '/search' ? {color:'rgb(231, 231, 231)',backgroundColor:'rgb(46,46,46)'} : {}}>
            Search... <FaSearch />
        </span>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/favourite"}>
           <img src={"/32px/Favorites.svg"} alt="" style={location.pathname === '/favourite' ? {backgroundColor:'rgb(200, 199, 199)',borderRadius:"50%"} : {}}/>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
           <img src={"/32px/Cart1.svg"} alt="" style={location.pathname === '/cart' ? {backgroundColor:'rgb(200, 199, 199)',borderRadius:"50%"} : {}}/>
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
                    Logout <FaSignOutAlt />
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
