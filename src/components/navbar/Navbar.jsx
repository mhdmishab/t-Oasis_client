import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/t-oasis logo.png"

import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/user/Auth';

function Navbar() {
  let user;
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userToken=localStorage.getItem("userToken");
  if (userToken) {
    try {
      const decodedToken = jwtDecode(userToken);
      user = decodedToken;
    } catch (err) {
      console.log(err.message);
    }
  }
  const {isLoggedIn}=useSelector(state=>state.userauth)
 
  

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout=()=>{
    localStorage.removeItem("userToken");
    dispatch(logout());
    navigate('/login');
  }

  const NavItemsLoggedOut=[
    {
      path:'/',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    
    },
    {
      path:'/login',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
    
    },
    {
      path:'/contact',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
    
    }
  ]
  const NavItemsLoggedIn=[
    {
      path:'/',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    
    },
    {
      path:'/contact',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
    
    },
    {
      
      icon:<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-6 h-6" onClick={handleLogout}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    },
    
   
  ]

 const NavItems=user||isLoggedIn?NavItemsLoggedIn:NavItemsLoggedOut;
  


  return (
   
    <>
      <nav className="fixed w-screen h-16 flex justify-between items-center bg-transparent">
        <div className="pl-5">
          <img className="w-16 h-16" src={logo} alt="" />
        </div>
        <div className="flex justify-center items-center pr-16">
          <div className={`flex lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
            {/* Render the mobile menu items */}
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
          {/* Render the toggle button */}
          <button
            className="lg:hidden ml-4 p-2 rounded-md bg-red-500 focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="white">
              <path
                fillRule="evenodd"
                d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Render the desktop menu items */}
          <div className="hidden lg:flex">
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
        </div>
      </nav>
    </>
  )
}

export default Navbar
