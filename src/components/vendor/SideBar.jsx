import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/t-oasis logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/vendor/Auth';
import { Button, Modal } from 'antd';


function SideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const { isLoggedIn } = useSelector((state) => state.vendorauth)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    useEffect(() => {
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            navigate('/manager/login');
        }
    }, [isLoggedIn, navigate])

    const handleLogout = () => {

        console.log("inside logout");
        localStorage.removeItem("vendorToken");
        dispatch(logout());
        setIsModalOpen(false);
        navigate('/manager/login');

    }
    const Menus = [
        {
            path: '/manager/dashboard',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>,
            title: "Dashboard"
        },
        {
            path: '/manager/lounges',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>,
            title: "Lounges"
        },
        {
            path: '/manager/bookings',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>,
            title: "Bookings"
        }, {

            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" onClick={showModal}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            title: "Logout",
            gap: true,

        },

    ]
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
                        <li className={`${menu.gap ? 'mt-80' : 'mt-3'}  text-sm hover:bg-green-300  hover:cursor-default rounded flex  `} key={index}
                        >

                            <NavLink className={`flex justify-start items-center gap-x-4 p-2 cursor-default`} to={menu.path}>

                                <span className={` w-7  text-white cursor-pointer hover:text-black`}>{menu.icon}</span>
                                <span className={`${!open && 'hidden'} ${menu.gap ? 'cursor-default' : 'cursor-pointer'} origin-left duration-200  text-white hover:text-black`}>{menu.title}</span>
                            </NavLink>


                        </li>
                    )
                })}
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
