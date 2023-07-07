import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function SideBArLayout({Menus}) {
  return (
    <div className='flex '>
        <SideBar Menus={Menus} />
        <Outlet />
      
    </div>
  )
}

export default SideBArLayout
