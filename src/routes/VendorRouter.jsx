import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/vendor/auth/Signup'

function VendorRouter() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/vendorsignup' element={<Signup/>}/>
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default VendorRouter
