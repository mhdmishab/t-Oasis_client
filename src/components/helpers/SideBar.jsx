import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/t-oasis logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/vendor/Auth';
import { Button, Modal } from 'antd';
import { LogoutAdmin } from '../../slices/admin/Auth';


function SideBar({Menus}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    // const { isLoggedInVendor } = useSelector((state) => state.vendorauth)
    // const {isLoggedInAdmin}=useSelector((state) => state.adminauth);
    const vendorLogout=localStorage.getItem('vendorToken');
    const adminLogout=localStorage.getItem('adminToken');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const Logout={
        icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" onClick={showModal}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
        title: "Logout",
        gap: true,
    }

    

      


    

    const handleLogout = () => {

        console.log("inside logout");
        if(vendorLogout){
            dispatch(logout());
            navigate('/manager/login');
        }else if(adminLogout){
            dispatch(LogoutAdmin());
            navigate('/admin/login')
        }
        
        setIsModalOpen(false);
        

    }
   
    return (

        <div className={`${open ? "w-72" : "w-20"} bg-green-800 h-screen pt-8 p-5 relative duration-300`}>

            <svg className={`absolute ${!open && "rotate-180"} w-7 cursor-pointer -right-3 top-9 bg-white border-2 border-green-800 rounded-full`} onClick={() => setOpen(!open)} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className='flex gap-x-4 items-center'>
                <div className={`w-20 cursor-pointer duration-500 flex justify-center bg-white rounded ${!open && 'rotate-180'} border-blue-600 `} >
                    <img src={logo} alt='logo' className={`w-16 cursor-pointer duration-500`} />

                </div>
                <h2 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>Manager Panel</h2>
            </div>
            <ul className='pt-6'>
                {Menus.map((menu, index) => {
                    return (
                        <li className={`mt-3 text-sm hover:bg-green-300  hover:cursor-default rounded flex  `} key={index}
                        >

                            <NavLink className={`flex justify-start items-center gap-x-4 p-2 cursor-default`} to={menu.path}>

                                <span className={` w-7  text-white cursor-pointer hover:text-black`}>{menu.icon}</span>
                                <span className={`${!open && 'hidden'} cursor-pointer origin-left duration-200  text-white hover:text-black`}>{menu.title}</span>
                            </NavLink>


                        </li>
                    )
                })}
                <li className='mt-80'> 
                    <div  className={`flex justify-start items-center gap-x-4 p-2 cursor-default`}>
                        <span className={` w-7  text-white cursor-pointer hover:text-black`}>{Logout.icon}</span>
                        <span className={`${!open && 'hidden'} cursor-default  origin-left duration-200  text-white hover:text-black`}>{Logout.title}</span>
                    </div>

                 </li>
            </ul>
            <>

                <Modal
                    title=""
                    open={isModalOpen}
                    onCancel={handleCancel}
                    className=""
                    footer={null}

                
                >
    

                    <div className="flex-col items-center ">
                    <p>
                        Are you sure you wanna Logout...
                    </p>
                        <button
                            type="submit"
                            className="px-5 py-1 rounded-md bg-green-700 text-white hover:bg-green-300 mt-5"
                            onClick={handleLogout}
                        >
                            Submit
                        </button>
                    </div>

                </Modal>




            </>

        </div>
    )
}

export default SideBar
