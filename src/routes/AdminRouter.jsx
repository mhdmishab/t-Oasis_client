import React from 'react'
import {  Route, Routes } from 'react-router-dom'

import Login from '../pages/admin/auth/Login'


function AdminRouter() {
  return (
    <>
      
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
      
    </>
  )
}

export default AdminRouter
