import { useEffect, useState } from 'react'
import { IconType } from 'react-icons';
import { AiFillFileText } from 'react-icons/ai';
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri';
import { Link, Location, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
    const location = useLocation();

    const [showModal,setShowModal] = useState<boolean>(false);
    const [phoneActive,setPhoneActive] = useState<boolean>(window.innerWidth < 768);

    const resizeHandler = () => {
        setPhoneActive(window.innerWidth < 768);
    };

    useEffect(()=>{
        window.addEventListener("resize",resizeHandler);

        return()=>{
            window.removeEventListener("resize",resizeHandler);
        }
    },[]);

  return (
    <>
    {phoneActive && (
        <button id="hamburger" onClick={()=>setShowModal(true)}>
            <HiMenuAlt4 />
        </button>
    )}
    <aside
     style={
        phoneActive ? {
            width:"12rem",
            height:"100vh",
            position:"fixed",
            top:0,
            left:showModal ? "0" :"-20rem",
            transition:"all 0.5s",
        } : {}
     }
    >
        <h2>Admin Dashboard</h2>
        <DivOne location={location} />
        <DivTwo location={location} />
        <DivThree location={location} />

        {phoneActive && (
            <button id="close-sidebar" onClick={()=>setShowModal(false)}>
                Close
            </button>
        )}
    </aside>
    </>
  )
}

const DivOne = ({location}:{location:Location})=> (
    <div>
        <h5>Dashboard</h5>
        <div className='status-check-container'>
            <Li 
               url="/admin/dashboard"
               text="Dashboard"
               Icon={RiDashboardFill}
               location={location}
            />
            <Li 
               url="/admin/product"
               text="Product"
               Icon={RiShoppingBag3Fill}
               location={location}
            />
            <Li 
               url="/admin/customer"
               text="Customer"
               Icon={IoIosPeople}
               location={location}
            />
            <Li 
               url="/admin/transaction"
               text="Transaction"
               Icon={AiFillFileText}
               location={location}
            />
        </div>
    </div>
) 

const DivTwo = ({location}:{location:Location}) => (
    <div>
        <h5>Charts</h5>
        <div className='status-check-container'>
            <Li 
               url="/admin/chart/bar"
               text="Bar"
               Icon={FaChartBar}
               location={location}
            />
            <Li 
               url="/admin/chart/pie"
               text="Pie"
               Icon={FaChartPie}
               location={location}
            />
            <Li 
               url="/admin/chart/line"
               text="Line"
               Icon={FaChartLine}
               location={location}
            />
        </div>
    </div>
)
const DivThree = ({location}:{location:Location}) => (
    <div>
        <h5>App</h5>
        <div className='status-check-container'>
            <Li 
               url="/admin/add/stopwatch"
               text="Stopwatch"
               Icon={FaStopwatch}
               location={location}
            />
            <Li 
               url="/admin/app/coupon"
               text="Coupon"
               Icon={RiCoupon3Fill}
               location={location}
            />
            <Li 
               url="/admin/app/toss"
               text="Toss"
               Icon={FaGamepad}
               location={location}
            />
        </div>
    </div>
)

interface LiProps{
    url:string;
    text:string;
    location:Location;
    Icon:IconType;
}

const Li = ({url,text,location,Icon}:LiProps) => (
    <Link to={url} style={{
        background:location.pathname.includes(url) ? "rgba(0,0,0,0.1)": "white",
        padding:"0.3rem 0.7rem"
    }}>
        <div className="status-check"><Icon/>{text}</div>
        </Link>
)
export default AdminSidebar
