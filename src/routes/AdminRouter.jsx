import React from 'react'
import {  Route, Routes } from 'react-router-dom'

import Login from '../pages/admin/auth/Login'
import Dashboard from '../pages/admin/home/Dashboard'
import Lounges from '../pages/admin/home/Lounges'


function AdminRouter() {
  return (
    <>
      
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/lounges' element={<Lounges/>}/>
        </Routes>
      
    </>
  )
}

export default AdminRouter
