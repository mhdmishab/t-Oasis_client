import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/vendor/auth/Signup'
import OtpPage from '../pages/vendor/auth/OtpPage'
import Login from '../pages/vendor/auth/Login'
import VendorAuthentication from '../middlewares/vendor/verification';
import Dashboard from '../pages/vendor/home/Dashboard'
import Lounges from '../pages/vendor/home/Lounges'
import Bookings from '../pages/vendor/home/Bookings'




function VendorRouter() {
  return (
    <>
     
          <Routes>
            <Route path='/register' element={<VendorAuthentication><Signup/></VendorAuthentication>}/>
            <Route path='/otp' element={<VendorAuthentication><OtpPage/></VendorAuthentication>}/>
            <Route path='/login' element={<VendorAuthentication><Login/></VendorAuthentication>}/>
            <Route path='/dashboard' element={<VendorAuthentication><Dashboard/></VendorAuthentication>}/>
            <Route path='/lounges' element={<VendorAuthentication><Lounges/></VendorAuthentication>}/>
            <Route path='/bookings' element={<VendorAuthentication><Bookings/></VendorAuthentication>}/>

              
          </Routes>
     
    </>
  )
}

export default VendorRouter
