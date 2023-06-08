import React from 'react'
import { Route,Routes} from 'react-router-dom';
import Signup from '../pages/user/auth/Signup';
import Login from '../pages/user/auth/Login';
import Home from '../pages/user/home/Home';
import Navbar from '../components/navbar/Navbar';
import OtpPage from '../pages/user/auth/OtpPage';
import UserVerification from '../middlewares/users/Verification';




function UserRouter() {
  return (
    <>
    
  
     <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<UserVerification><Signup/></UserVerification>}/>
            <Route path='/login' element={<UserVerification><Login/></UserVerification>}/>
            <Route path='/otp' element={<UserVerification><OtpPage/></UserVerification>}/>
            
        </Routes>


    
    </>
  )
}

export default UserRouter
