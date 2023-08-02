import React, { useState } from 'react';
import logo from "../../assets/images/t-oasis logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetLoungeSliceAdmin } from '../../slices/admin/Lounges';
import {  Modal } from 'antd';
import { LogoutAdmin } from '../../slices/admin/Auth';


function AdminSideBar() {

     

    const Menus = [
        {
            path: '/admin/dashboard',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>,
            title: "Dashboard"
        },
        {
            path: '/admin/lounges',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>,
            title: "Lounges"
        },
        {
            path: '/admin/facilities',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>,
            title: "Facilities"
        },
        {
            path: '/admin/banner',
            icon: <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>,
            title: "Banners"
        }
      
    
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const Logout = {
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={showModal}
          className="cursor-pointer"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Logout",
      gap: true,
    };
  
    const handleLogout = () => {
    
        dispatch(LogoutAdmin());
        dispatch(resetLoungeSliceAdmin());
        navigate('/admin/login');
      
  
      setIsModalOpen(false);
    };
  
    return (
      <div className={`bg-green-800 min-h-screen ${open ? "w-72" : "w-20"} duration-300 p-5 pt-8 relative  `}>
        <svg
          className={`absolute ${!open && "rotate-180"} w-7 cursor-pointer -right-3 top-9 bg-white border-2 border-green-800 rounded-full`}
          onClick={() => setOpen(!open)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <div className="flex gap-x-4 items-center">
          <div className={`w-20 cursor-pointer duration-500 flex justify-center bg-white rounded ${!open && "rotate-180"} border-blue-600`}>
            <img src={logo} alt="logo" className={`w-16 cursor-pointer duration-500`} />
          </div>
          <h2 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Admin Panel</h2>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li className={`mt-3 text-sm hover:bg-green-300 hover:cursor-default rounded flex`} key={index}>
              <NavLink className={`flex justify-start items-center gap-x-4 p-2 cursor-default`} to={menu.path}>
                <span className={`w-7 text-white cursor-pointer hover:text-black`}>{menu.icon}</span>
                <span className={`${!open && "hidden"} cursor-pointer origin-left duration-200 text-white hover:text-black`}>{menu.title}</span>
              </NavLink>
            </li>
          ))}
          <li className="mt-80">
            <div className={`flex justify-start items-center gap-x-4 p-2 cursor-default`} onClick={showModal}>
              <span className={`w-7 text-white cursor-pointer hover:text-black`}>{Logout.icon}</span>
              <span className={`${!open && "hidden"} cursor-default origin-left duration-200 text-white hover:text-black`}>{Logout.title}</span>
            </div>
          </li>
        </ul>
        <Modal title="" open={isModalOpen} onCancel={handleCancel} className="" footer={null}>
          <div className="flex flex-col items-center">
            <p>Are you sure you want to Logout?</p>
            <button
              type="submit"
              className="px-5 py-1 rounded-md bg-green-700 text-white hover:bg-green-300 mt-5"
              onClick={handleLogout}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    );
}

export default AdminSideBar




