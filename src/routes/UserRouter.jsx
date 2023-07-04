import React from 'react'
import { Route,Routes} from 'react-router-dom';
import Signup from '../pages/user/auth/Signup';
import Login from '../pages/user/auth/Login';
import Home from '../pages/user/home/Home';
import Navbar from '../components/navbar/Navbar';
import OtpPage from '../pages/user/auth/OtpPage';
import UserVerification from '../middlewares/users/Verification';
import NavabarLayout from '../components/navbar/NavabarLayout';
import SearchPage from '../pages/user/home/SearchPage';
import LoungeHome from '../pages/user/home/LoungeHome';
import FacilityBooking from '../pages/user/home/FacilityBooking';




function UserRouter() {
  return (
    <>
    
  
  
        <Routes>
          <Route element={<NavabarLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/search-lounges' element={<SearchPage/>}/>
            <Route path='/lounge' element={<LoungeHome/>}/>
            <Route path='/facilitybooking' element={<FacilityBooking/>}/>
            <Route path='/register' element={<UserVerification><Signup/></UserVerification>}/>
            <Route path='/login' element={<UserVerification><Login/></UserVerification>}/>
         </Route>
            <Route path='/otp' element={<UserVerification><OtpPage/></UserVerification>}/>
            
        </Routes>


    
    </>
  )
}

export default UserRouter
