import React from 'react'
import SideBar from '../../../components/vendor/SideBar'
import DashboardManagement from '../../../components/vendor/DashboardManagement'



function Dashboard() {
  return (
    <section className='flex gap-6'>
      
       
    <SideBar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <DashboardManagement/>
        
      </div>

    </section>
  )
}

export default Dashboard
