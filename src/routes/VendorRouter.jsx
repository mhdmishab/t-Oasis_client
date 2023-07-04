import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/vendor/auth/Signup'
import OtpPage from '../pages/vendor/auth/OtpPage'
import Login from '../pages/vendor/auth/Login'
import VendorAuthentication from '../middlewares/vendor/verification';
import Dashboard from '../pages/vendor/home/Dashboard'
import Lounges from '../pages/vendor/home/Lounges'
import Bookings from '../pages/vendor/home/Bookings'
import Lounge from '../pages/vendor/home/Lounge'
import LoungeSubcription from '../pages/vendor/home/LoungeSubcription'
import LoungeFacilities from '../pages/vendor/home/LoungeFacilities'
import Facility from '../pages/vendor/home/Facility'




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
            <Route path='/lounge/dashboard' element={<VendorAuthentication><Lounge/></VendorAuthentication>}/>
            <Route path='/lounge/facilities' element={<VendorAuthentication><LoungeFacilities/></VendorAuthentication>}/>
            <Route path='/lounge/subcriptions' element={<VendorAuthentication><LoungeSubcription/></VendorAuthentication>}/>
            <Route path='/lounge/facility' element={<VendorAuthentication><Facility/></VendorAuthentication>}/>

              
          </Routes>
     
    </>
  )
}

export default VendorRouter
