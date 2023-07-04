import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function NavabarLayout() {
  return (
    
    <>

        <Navbar/>
        <Outlet/>
     
    </>
   
  )
}

export default NavabarLayout
