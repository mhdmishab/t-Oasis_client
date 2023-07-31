import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/t-oasis logo.png";
import {  Menu, Dropdown } from 'antd';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/user/Auth';
import {  resetLoungeSliceUser } from '../../slices/user/Lounges';
import { resetFacilitySliceUser } from '../../slices/user/Facility';


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage?.getItem("userToken");
  const  userprofile  = useSelector(state => state.loungeuser).user;
 


  const handleLogout = async() => {
    console.log("inside user logout")
    localStorage.removeItem("userToken");
    dispatch(logout());
    navigate('/login');
    
    // dispatch(resetLoungeSliceUser());
    // dispatch(resetFacilitySliceUser());
  };

  

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile and Bookings</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  let user = null;
  if (userToken) {
    try {
      const decodedToken = jwtDecode(userToken);
      user = decodedToken;
    } catch (err) {
      console.log(err.message);
    }
  }

  const NavItemsLoggedOut = [
    {
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      path: '/login',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
  ];

  const NavItemsLoggedIn = [
    {
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      icon: (
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={userprofile?userprofile[0]?.image?.url:''} alt="user" />
          </button>
        </Dropdown>
      ),
    },
  ];

  const NavItems = user ? NavItemsLoggedIn : NavItemsLoggedOut;


  return (
    <nav className="z-10 fixed w-screen h-16 flex justify-between items-center bg-white shadow-md">
      <div className="pl-5">
        <img className="w-16 h-16" src={logo} alt="" />
      </div>
      <div className="flex justify-center items-center ">
        
          {NavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => isActive ? 'active-state' : 'inactive-state'}
            >
              
              {item.icon}
            </NavLink>
          ))}
   
      </div>
    </nav>
  );
}

export default Navbar;


