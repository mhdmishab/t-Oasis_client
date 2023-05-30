import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Signup from '../pages/user/auth/Signup';
import Login from '../pages/user/auth/Login';
import Home from '../pages/user/home/Home';
import Navbar from '../components/navbar/Navbar';




function UserRouter() {
  return (
    <>
    
    <BrowserRouter>
     <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            
        </Routes>

    </BrowserRouter>

    
    </>
  )
}

export default UserRouter