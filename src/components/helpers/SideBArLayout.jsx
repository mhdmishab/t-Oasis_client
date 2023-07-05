import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function SideBArLayout({Menus}) {
  return (
    <div className='flex '>
        <SideBar Menus={Menus} className={"overflow-hidden"}/>
        <Outlet className={"overflow-auto"}/>
      
    </div>
  )
}

export default SideBArLayout
