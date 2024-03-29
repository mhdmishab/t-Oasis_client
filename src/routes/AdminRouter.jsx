import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import AdminAuthentication from '../middlewares/admin/Verification';
import Login from '../pages/admin/auth/Login'
import Dashboard from '../pages/admin/home/Dashboard'
import Lounges from '../pages/admin/home/Lounges'
import LoungeApproval from '../pages/admin/home/LoungeApproval';
import Facilitytypes from '../pages/admin/home/Facilitytypes';
import Banners from '../pages/admin/home/Banners';
import Errorpage from '../components/helpers/Errorpage';


function AdminRouter() {
  return (
    <>
      
        <Routes>
            <Route path='/login' element={<AdminAuthentication><Login/></AdminAuthentication>}/>
            <Route path='/dashboard' element={<AdminAuthentication><Dashboard/></AdminAuthentication>}/>
            <Route path='/lounges' element={<AdminAuthentication><Lounges/></AdminAuthentication>}/>
            <Route path='/facilities' element={<AdminAuthentication><Facilitytypes/></AdminAuthentication>}/>
            <Route path='/banner' element={<AdminAuthentication><Banners/></AdminAuthentication>}/>
            <Route path='/approval' element={<AdminAuthentication><LoungeApproval/></AdminAuthentication>}/>
            <Route path='/*'  element={<Errorpage/>}/>
        </Routes>
      
    </>
  )
}

export default AdminRouter
