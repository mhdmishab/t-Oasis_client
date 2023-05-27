import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/admin/auth/Signup'

function AdminRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/adminsignup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AdminRouter
