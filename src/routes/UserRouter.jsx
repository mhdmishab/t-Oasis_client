import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Signup from '../pages/user/auth/Signup';
import Login from '../pages/user/auth/Login';


function UserRouter() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            
        </Routes>

    </BrowserRouter>

    
    </>
  )
}

export default UserRouter
