import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/vendor/auth/Signup'
import OtpPage from '../pages/vendor/auth/OtpPage'
import Login from '../pages/vendor/auth/Login'
import VendorAuthentication from '../middlewares/vendor/verification';
import Home from '../components/vendor/Home'



function VendorRouter() {
  return (
    <>
     
            <Routes>
            <Route path='/register' element={<VendorAuthentication><Signup/></VendorAuthentication>}/>
            <Route path='/otp' element={<VendorAuthentication><OtpPage/></VendorAuthentication>}/>
            <Route path='/login' element={<VendorAuthentication><Login/></VendorAuthentication>}/>
            <Route path='/home' element={<VendorAuthentication><Home/></VendorAuthentication>}/>

              
            </Routes>
     
    </>
  )
}

export default VendorRouter
